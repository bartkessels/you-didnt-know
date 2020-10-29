import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FirestoreUtil } from 'src/app/utils/firestore.util';
import { SettingsUtil } from 'src/app/utils/settings.util';

import { SettingsComponent } from './settings.component';

describe('SettingsComponent', () => {
  const snackBarStub = {
    open: jasmine.createSpy('open')
  };

  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let snackbar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsComponent ],
      providers: [
        { provide: MatSnackBar, useValue: snackBarStub }
      ]
    })
    .compileComponents();

    spyOn(SettingsUtil, 'saveFirebaseProjectId');
    spyOn(SettingsUtil, 'saveFirebaseApiKey');
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    snackbar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should save the firebaseProjectId and firebaseApiKey when the save button is pressed', fakeAsync(() => {
    // Arrange
    const expectedFirebaseProjectId = 'project-id';
    const expectedFirebaseApiKey = 'api-key';

    component.firebaseProjectId = expectedFirebaseProjectId;
    component.firebaseApiKey = expectedFirebaseApiKey;

    // Act
    const saveButton: HTMLElement = fixture.nativeElement.querySelector('#save-settings');
    saveButton.click();

    // Assert
    expect(SettingsUtil.saveFirebaseProjectId).toHaveBeenCalledWith(expectedFirebaseProjectId);
    expect(SettingsUtil.saveFirebaseApiKey).toHaveBeenCalledWith(expectedFirebaseApiKey);
  }));

  it('should call initializeFirestore on the FirestoreUtil', fakeAsync(() => {
    // Arrange
    spyOn(FirestoreUtil, 'initializeFirestore');

    // Act
    const saveButton: HTMLElement = fixture.nativeElement.querySelector('#save-settings');
    saveButton.click();

    // Assert
    expect(FirestoreUtil.initializeFirestore).toHaveBeenCalled();
  }));

  it('should show snackbar that the settings are saved', fakeAsync(() => {
    // Act
    const saveButton: HTMLElement = fixture.nativeElement.querySelector('#save-settings');
    saveButton.click();

    // Assert
    expect(snackbar.open).toHaveBeenCalled();
  }));
});

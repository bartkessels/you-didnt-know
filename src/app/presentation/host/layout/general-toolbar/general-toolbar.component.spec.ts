import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralToolbarComponent } from './general-toolbar.component';

describe('GeneralToolbarComponent', () => {
  let component: GeneralToolbarComponent;
  let fixture: ComponentFixture<GeneralToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have the dashboard link for the open dashboard button', () => {
    // Arrange
    const openDashboardLink: HTMLElement = fixture.nativeElement.querySelector('#open-dashboard');

    // Assert
    expect(openDashboardLink.getAttribute('routerLink')).toEqual('/host/dashboard');
  });

  it('should have the settings link for the open settings button', () => {
    // Arrange
    const openSettingsLink: HTMLElement = fixture.nativeElement.querySelector('#open-settings');

    // Assert
    expect(openSettingsLink.getAttribute('routerLink')).toEqual('/host/settings');
  });
});

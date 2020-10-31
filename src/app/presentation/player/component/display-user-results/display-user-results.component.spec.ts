import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayUserResultsComponent } from './display-user-results.component';

describe('DisplayUserResultsComponent', () => {
  let component: DisplayUserResultsComponent;
  let fixture: ComponentFixture<DisplayUserResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayUserResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayUserResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

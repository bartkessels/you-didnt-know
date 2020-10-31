import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayAssignmentComponent } from './display-assignment.component';

describe('DisplayAssignmentComponent', () => {
  let component: DisplayAssignmentComponent;
  let fixture: ComponentFixture<DisplayAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

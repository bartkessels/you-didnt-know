import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecuteAssignmentComponent } from './execute-assignment.component';

describe('ExecuteAssignmentComponent', () => {
  let component: ExecuteAssignmentComponent;
  let fixture: ComponentFixture<ExecuteAssignmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExecuteAssignmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExecuteAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});

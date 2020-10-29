import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-manage-assignment',
  templateUrl: './manage-assignment.component.html',
  styleUrls: ['./manage-assignment.component.scss']
})
export class ManageAssignmentComponent {
  @Input() assignment: Assignment;
  @Output() deleteAssignment = new EventEmitter();

  public deleteAssignmentButtonClicked(): void {
    this.deleteAssignment.emit();
  }
}

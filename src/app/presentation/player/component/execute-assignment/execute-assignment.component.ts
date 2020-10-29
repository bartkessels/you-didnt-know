import { Component, Input } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-execute-assignment',
  templateUrl: './execute-assignment.component.html',
  styleUrls: ['./execute-assignment.component.scss']
})
export class ExecuteAssignmentComponent {
  @Input() assignment: Assignment;
}

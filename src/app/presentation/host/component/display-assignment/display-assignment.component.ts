import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';

@Component({
  selector: 'app-display-assignment',
  templateUrl: './display-assignment.component.html',
  styleUrls: ['./display-assignment.component.scss']
})
export class DisplayAssignmentComponent {
  @Input() assignment: Assignment;
  @Output() assignmentExecuted = new EventEmitter();
}

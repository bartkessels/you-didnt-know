import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Results } from 'src/app/models/results.model';

@Component({
  selector: 'app-display-results',
  templateUrl: './display-results.component.html',
  styleUrls: ['./display-results.component.scss']
})
export class DisplayResultsComponent {
  @Input() results: Results;
  @Output() resultsViewed = new EventEmitter();
}

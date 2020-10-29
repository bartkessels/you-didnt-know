import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Results } from 'src/app/models/results.model';

@Component({
  selector: 'app-display-results',
  templateUrl: './display-results.component.html',
  styleUrls: ['./display-results.component.scss']
})
export class DisplayResultsComponent {
  @Input() results: Results;
  @Input() aboutPlayer: Player;
  @Output() resultsViewed = new EventEmitter();
}

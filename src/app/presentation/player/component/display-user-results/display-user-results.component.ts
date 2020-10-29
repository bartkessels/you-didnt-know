import { Component, Input, OnInit } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Results } from 'src/app/models/results.model';

@Component({
  selector: 'app-display-user-results',
  templateUrl: './display-user-results.component.html',
  styleUrls: ['./display-user-results.component.scss']
})
export class DisplayUserResultsComponent implements OnInit {
  public loser: Player;
  public winner: Player;

  @Input() aboutPlayer: Player;
  @Input() currentPlayer: Player;
  @Input() results: Results;

  constructor() { }

  public ngOnInit(): void {
    if (this.aboutPlayer.id !== this.currentPlayer.id) {
      const isInWinners = this.results.correctAnswers.filter(a => a.player.id === this.currentPlayer.id);

      if (isInWinners.length > 0) {
        this.winner = this.currentPlayer;
      } else {
        this.loser = this.currentPlayer;
      }
    }
  }
}

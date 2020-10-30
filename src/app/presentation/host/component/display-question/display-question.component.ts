import { Component, Input } from '@angular/core';
import { Player } from 'src/app/models/player.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.scss']
})
export class DisplayQuestionComponent {
  @Input() aboutPlayer: Player;
  @Input() question: Question;
}

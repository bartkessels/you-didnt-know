import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Player } from 'src/app/models/player.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-answer-question',
  templateUrl: './answer-question.component.html',
  styleUrls: ['./answer-question.component.scss']
})
export class AnswerQuestionComponent {
  @Input() aboutPlayer: Player;
  @Input() currentPlayer: Player;
  @Input() question: Question;
  @Output() answerSelected = new EventEmitter<Answer>();

}

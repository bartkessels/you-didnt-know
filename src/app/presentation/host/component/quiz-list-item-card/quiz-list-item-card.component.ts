import { Component, Input } from '@angular/core';
import { Quiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-quiz-list-item-card',
  templateUrl: './quiz-list-item-card.component.html',
  styleUrls: ['./quiz-list-item-card.component.scss']
})
export class QuizListItemCardComponent {
  @Input() quiz: Quiz;
}

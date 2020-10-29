import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Question } from 'src/app/models/question.model';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.component.html',
  styleUrls: ['./manage-question.component.scss']
})
export class ManageQuestionComponent {
  @Input() question: Question;
  @Output() deleteQuestion = new EventEmitter();

  public addAnswerButtonClicked(): void {
    const tempAnswer: Answer = {
      id: Date.now().toString(),
      answer: ''
    };

    this.question.answers.push(tempAnswer);
  }

  public deleteAnswerButtonClicked(answer: Answer): void {
    const index: number = this.question.answers.indexOf(answer);

    if (index >= 0) {
        this.question.answers.splice(index, 1);
    }
  }

  public deleteQuestionButtonClicked(): void {
    this.deleteQuestion.emit();
  }
}

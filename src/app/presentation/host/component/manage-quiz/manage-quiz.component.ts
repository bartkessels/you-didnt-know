import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Assignment } from 'src/app/models/assignment.model';
import { Question } from 'src/app/models/question.model';
import { Quiz } from 'src/app/models/quiz.model';

@Component({
  selector: 'app-manage-quiz',
  templateUrl: './manage-quiz.component.html',
  styleUrls: ['./manage-quiz.component.scss']
})
export class ManageQuizComponent {
  @Input() title: string;
  @Input() quiz: Quiz;
  @Output() saveQuiz = new EventEmitter<Quiz>();

  public addQuestionButtonClicked(): void {
    const tempQuestion: Question = {
      id: Date.now().toString(),
      question: 'Should I change this question?',
      answers: []
    };

    this.quiz.questions.push(tempQuestion);
  }

  public deleteQuestionButtonClicked(question: Question): void {
    const index: number = this.quiz.questions.indexOf(question);

    if (index >= 0) {
        this.quiz.questions.splice(index, 1);
    }
  }

  public addAssignmentButtonClicked(): void {
    const tempAssignment: Assignment = {
      id: Date.now().toString(),
      order: 'Change this assignment',
      details: 'Some extra information about this order',
      description: 'How do we need to execute this order?'
    };

    this.quiz.assignments.push(tempAssignment);
  }

  public deleteAssignmentButtonClicked(assignment: Assignment): void {
    const index: number = this.quiz.assignments.indexOf(assignment);

    if (index >= 0) {
        this.quiz.assignments.splice(index, 1);
    }
  }

  public saveButtonClicked(): void {
    this.saveQuiz.emit(this.quiz);
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.scss']
})
export class CreateQuizComponent {
  public emptyQuiz: Quiz = {
    id: Date.now().toString(),
    title: '',
    questions: [],
    assignments: []
  };

  constructor(
    private quizService: QuizService,
    private router: Router
  ) { }

  public saveQuiz(quiz: Quiz): void {
    this.quizService.insertOrUpdateQuiz(quiz);
    this.router.navigateByUrl('/host/dashboard');
  }

  // should call insertOrUpdateQuiz with the quiz items
  // should navigate back to the dashboard
}

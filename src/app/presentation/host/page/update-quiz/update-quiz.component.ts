import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {
  public quiz: Quiz;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(parameter => {
      const quizId = parameter.quizId;
      this.quizService.getQuiz(quizId).subscribe(quiz => {
        this.quiz = quiz;
      });
    });
  }

  public saveQuiz(quiz: Quiz): void {
    this.quizService.insertOrUpdateQuiz(quiz);
    this.router.navigateByUrl('/host/dashboard');
  }

  // should call insertOrUpdateQuiz with the quiz items
  // should navigate back to the dashboard
}

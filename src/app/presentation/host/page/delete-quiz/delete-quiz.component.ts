import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-delete-quiz',
  templateUrl: './delete-quiz.component.html',
  styleUrls: ['./delete-quiz.component.scss']
})
export class DeleteQuizComponent implements OnInit {
  public quiz: Quiz;

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const quizId = params.quizId;

      this.quizService.getQuiz(quizId).subscribe(quiz => {
        this.quiz = quiz;
      });
    });
  }

  public deleteQuiz(): void {
    this.quizService.deleteQuiz(this.quiz.id);
    this.router.navigateByUrl('/host/dashboard');
  }
}

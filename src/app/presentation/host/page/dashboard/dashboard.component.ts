import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public quizzes: Observable<Quiz[]>;

  constructor(private quizService: QuizService) {
    this.quizzes = this.quizService.getAllQuizzes();

    this.quizService.getAllQuizzes().subscribe(q => {
      console.log(q);
    });
  }

  ngOnInit(): void {
    // this.quizzes = this.quizService.getAllQuizzes();
  }
}

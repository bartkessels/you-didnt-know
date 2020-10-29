import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/models/assignment.model';
import { Player } from 'src/app/models/player.model';
import { Question } from 'src/app/models/question.model';
import { Results } from 'src/app/models/results.model';
import { AboutPlayerService } from 'src/app/service/about-player.service';
import { CurrentAssignmentService } from 'src/app/service/current-assignment.service';
import { CurrentQuestionService } from 'src/app/service/current-question.service';
import { CurrentResultsService } from 'src/app/service/current-results.service';
import { PlayGameService } from 'src/app/service/play-game.service';
import { QuizService } from 'src/app/service/quiz.service';

@Component({
  selector: 'app-play-quiz',
  templateUrl: './play-quiz.component.html',
  styleUrls: ['./play-quiz.component.scss']
})
export class PlayQuizComponent implements OnInit {
  public currentQuestion: Question;
  public currentAssignment: Assignment;
  public currentResults: Results;
  public aboutPlayer: Player;

  constructor(
    private quizService: QuizService,
    private playGameService: PlayGameService,
    private currentQuestionService: CurrentQuestionService,
    private currentAssignmentService: CurrentAssignmentService,
    private currentResultsService: CurrentResultsService,
    private aboutPlayerService: AboutPlayerService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.currentQuestionService.getCurrentQuestion().subscribe(q => {
      this.currentQuestion = q;
    });

    this.currentAssignmentService.getCurrentAssignment().subscribe(a => {
      this.currentAssignment = a;
    });

    this.currentResultsService.getCurrentResults().subscribe(r => {
      this.currentResults = r;
    });

    this.aboutPlayerService.getAboutPlayer().subscribe(p => {
      this.aboutPlayer = p;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const quizId = params.quizId;

      this.quizService.getQuiz(quizId).subscribe(quiz => {
        this.playGameService.startQuiz(quiz);
      });
    });
  }

  public onQuitQuizButtonClicked(): void {
    this.playGameService.endQuiz();

    this.router.navigateByUrl('/host/dashboard');
  }

  public onAssignmentExecutedButtonClicked(): void {
    this.playGameService.assignmentExecuted();
  }

  public onResultsViewedButtonClicked(): void {
    this.playGameService.resultsViewed();
  }
}

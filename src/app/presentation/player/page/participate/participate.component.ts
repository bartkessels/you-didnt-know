import { Component } from '@angular/core';
import { Answer } from 'src/app/models/answer.model';
import { Assignment } from 'src/app/models/assignment.model';
import { Player } from 'src/app/models/player.model';
import { Question } from 'src/app/models/question.model';
import { Results } from 'src/app/models/results.model';
import { AboutPlayerService } from 'src/app/service/about-player.service';
import { CurrentAnswersService } from 'src/app/service/current-answers.service';
import { CurrentAssignmentService } from 'src/app/service/current-assignment.service';
import { CurrentQuestionService } from 'src/app/service/current-question.service';
import { CurrentResultsService } from 'src/app/service/current-results.service';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.scss']
})
export class ParticipateComponent {
  public currentQuestion: Question;
  public currentAssignment: Assignment;
  public currentResults: Results;
  public aboutPlayer: Player;

  public currentPlayer: Player;

  constructor(
    private playerService: PlayerService,
    private currentQuestionService: CurrentQuestionService,
    private currentAssignmentService: CurrentAssignmentService,
    private currentResultsService: CurrentResultsService,
    private currentAnswersService: CurrentAnswersService,
    private aboutPlayerService: AboutPlayerService
  ) {
    this.playerService.getSelf().subscribe(p => {
      this.currentPlayer = p;
    });

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

  public answerButtonClicked(answer: Answer): void {
    this.currentAnswersService.sendAnswer(this.currentQuestion, answer, this.currentPlayer);
    this.currentQuestion = null;
  }
}

import { Injectable } from '@angular/core';
import { Assignment } from '../models/assignment.model';
import { Player } from '../models/player.model';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { Results } from '../models/results.model';
import { AboutPlayerService } from './about-player.service';
import { CurrentAnswersService } from './current-answers.service';
import { CurrentAssignmentService } from './current-assignment.service';
import { CurrentQuestionService } from './current-question.service';
import { CurrentResultsService } from './current-results.service';
import { PlayerService } from './player.service';

@Injectable({
  providedIn: 'root'
})
export class PlayGameService {
  private questions: Question[];
  private assignments: Assignment[];
  private players: Player[];
  private aboutPlayer: Player;

  constructor(
    private currentQuestionService: CurrentQuestionService,
    private currentAssignmentService: CurrentAssignmentService,
    private currentAnswersService: CurrentAnswersService,
    private currentResultsService: CurrentResultsService,
    private aboutPlayerService: AboutPlayerService,
    private playerService: PlayerService
  ) { }

  public async startQuiz(quiz: Quiz): Promise<void> {
    this.questions = quiz.questions;
    this.assignments = quiz.assignments;

    this.currentAnswersService.getAllAnswers().subscribe(answers => {
      const questionAnswers = answers.filter(q => q.question.id === this.questions[0].id);

      if (this.players != null && questionAnswers.length >= this.players.length) {
        const correctAnswer = questionAnswers.filter(a => a.player.id === this.aboutPlayer.id)[0];

        const correctAnswers = questionAnswers.filter(a => a.player.id !== this.aboutPlayer.id && a.answer.id === correctAnswer.answer.id);
        const wrongAnswers = questionAnswers.filter(a => a.player.id !== this.aboutPlayer.id && a.answer.id !== correctAnswer.answer.id);

        const results: Results = {
          question: this.questions[0],
          wrongAnswers,
          correctAnswers
        };

        this.goToResults(results);
      }
    });

    this.playerService.getAllPlayers().subscribe(players => {
      this.players = players;

      if (players.length > 0) {
        this.goToNextItem();
      }
    });
  }

  public async resultsViewed(): Promise<void> {
    await this.currentResultsService.deleteCurrentResults();
    await this.currentQuestionService.deleteCurrentQuestion();

    await this.goToNextItem();
  }

  public async assignmentExecuted(): Promise<void> {
    await this.currentAssignmentService.deleteCurrentAssignment();
    await this.goToNextItem();
  }

  private async setAboutPlayer(): Promise<void> {
    const randomPlayerIndex = Math.floor(Math.random() * this.players.length);
    this.aboutPlayer = this.players[randomPlayerIndex];

    await this.aboutPlayerService.setAboutPlayer(this.aboutPlayer);
  }

  private async goToNextItem(): Promise<void> {
    const shouldGoToAssignment = Math.floor(Math.floor(Math.random() * 50)) % 3 === 0;

    if (shouldGoToAssignment && this.assignments.length > 1) {
      this.goToNextAssignment();
    } else if (this.questions.length > 1) {
      this.goToNextQuestion();
    } else {
      this.endQuiz();
    }
  }

  public async endQuiz(): Promise<void> {
    this.currentQuestionService.deleteCurrentQuestion();
    this.currentAssignmentService.deleteCurrentAssignment();
    this.currentResultsService.deleteCurrentResults();
    this.currentAnswersService.deleteCurrentAnswers();
    this.aboutPlayerService.deleteAboutPlayer();
  }

  private async goToNextQuestion(): Promise<void> {
    this.questions.splice(0, 1);

    await this.currentQuestionService.setCurrentQuestion(this.questions[0]);
    await this.setAboutPlayer();
  }

  private async goToNextAssignment(): Promise<void> {
    this.assignments.splice(0, 1);

    this.currentAssignmentService.setCurrentAssignment(this.assignments[0]);
  }

  private async goToResults(results: Results): Promise<void> {
    await this.currentQuestionService.deleteCurrentQuestion();

    await this.currentResultsService.setCurrentResults(results);
  }
}

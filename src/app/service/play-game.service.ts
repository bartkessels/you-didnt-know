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

  private currentQuestionIndex = 0;
  private currentAssignmentIndex = 0;

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

    this.playerService.getAllPlayers().subscribe(async players => {
      this.players = players;

      if (players.length > 0) {
        await this.goToNextItem();
      }
    });

    this.currentAnswersService.getAllAnswers().subscribe(async answers => {
      const questionAnswers = answers.filter(q => q.question.id === this.questions[this.currentQuestionIndex].id);

      if (this.players != null && questionAnswers.length >= this.players.length) {
        const correctAnswer = questionAnswers.filter(a => a.player.id === this.aboutPlayer.id)[0];

        const correctAnswers = questionAnswers.filter(a => a.player.id !== this.aboutPlayer.id && a.answer.id === correctAnswer.answer.id);
        const wrongAnswers = questionAnswers.filter(a => a.player.id !== this.aboutPlayer.id && a.answer.id !== correctAnswer.answer.id);

        const results: Results = {
          question: this.questions[this.currentQuestionIndex],
          wrongAnswers,
          correctAnswers,
          correctAnswer
        };

        await this.goToResults(results);
      }
    });
  }

  public async resultsViewed(): Promise<void> {
    this.questions.splice(this.currentQuestionIndex, 1);
    await this.currentResultsService.deleteCurrentResults();
    await this.currentQuestionService.deleteCurrentQuestion();

    await this.goToNextItem();
  }

  public async assignmentExecuted(): Promise<void> {
    this.assignments.splice(this.currentAssignmentIndex, 1);
    await this.currentAssignmentService.deleteCurrentAssignment();

    await this.goToNextItem();
  }

  public async setAboutPlayer(): Promise<void> {
    const randomPlayerIndex = Math.floor(Math.random() * this.players.length);
    this.aboutPlayer = this.players[randomPlayerIndex];

    await this.aboutPlayerService.setAboutPlayer(this.aboutPlayer);
  }

  private async goToNextItem(): Promise<void> {
    const shouldGoToAssignment = Math.floor(Math.floor(Math.random() * 50)) % 3 === 0;

    if ((shouldGoToAssignment || this.questions.length <= 0) && this.assignments.length > 0) {
      await this.goToNextAssignment();
    } else if (this.questions.length > 0) {
      await this.goToNextQuestion();
    } else {
      await this.endQuiz();
    }
  }

  public async endQuiz(): Promise<void> {
    await this.currentQuestionService.deleteCurrentQuestion();
    await this.currentAssignmentService.deleteCurrentAssignment();
    await this.currentResultsService.deleteCurrentResults();
    await this.currentAnswersService.deleteCurrentAnswers();
    await this.aboutPlayerService.deleteAboutPlayer();
  }

  private async goToNextQuestion(): Promise<void> {
    this.currentQuestionIndex = Math.floor(Math.floor(Math.random() * this.questions.length));

    await this.currentQuestionService.setCurrentQuestion(this.questions[this.currentQuestionIndex]);
    await this.setAboutPlayer();
  }

  private async goToNextAssignment(): Promise<void> {
    this.currentAssignmentIndex = Math.floor(Math.floor(Math.random() * this.assignments.length));

    await this.currentAssignmentService.setCurrentAssignment(this.assignments[this.currentAssignmentIndex]);
  }

  private async goToResults(results: Results): Promise<void> {
    await this.currentQuestionService.deleteCurrentQuestion();

    await this.currentResultsService.setCurrentResults(results);
  }
}

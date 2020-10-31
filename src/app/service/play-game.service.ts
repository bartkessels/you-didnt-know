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

    this.playerService.getAllPlayers().subscribe(players => {
      this.players = players;

      if (players.length > 0) {
        this.goToNextItem();
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

  public resultsViewed(): void {
    this.questions.splice(this.currentQuestionIndex, 1);
    this.currentResultsService.deleteCurrentResults();
    this.currentQuestionService.deleteCurrentQuestion();

    this.goToNextItem();
  }

  public assignmentExecuted(): void {
    this.assignments.splice(this.currentAssignmentIndex, 1);
    this.currentAssignmentService.deleteCurrentAssignment();
    this.goToNextItem();
  }

  private setAboutPlayer(): void {
    const randomPlayerIndex = Math.floor(Math.random() * this.players.length);
    this.aboutPlayer = this.players[randomPlayerIndex];

    this.aboutPlayerService.setAboutPlayer(this.aboutPlayer);
  }

  private goToNextItem(): void {
    const shouldGoToAssignment = Math.floor(Math.floor(Math.random() * 50)) % 3 === 0;

    if ((shouldGoToAssignment || this.questions.length <= 0) && this.assignments.length > 0) {
      this.goToNextAssignment();
    } else if (this.questions.length > 0) {
      this.goToNextQuestion();
    } else {
      this.endQuiz();
    }
  }

  // should go to the next assignment if % 3 === 0 and there are questions and assignments
  // should go to the next assigment if % 3 !== 0 but there are no more question and there are assignments
  // should go to the next question if % 3 !== 0 and there are questions but there are no assignments
  // should go to the next question if % 3 === 0 but there are no more assignments
  // should end the quiz when % 3 === 0 but there are no questions or assignments
  // should en the quiz when %3 !== 0 and there are no questions or assignments

  public endQuiz(): void {
    this.currentQuestionService.deleteCurrentQuestion();
    this.currentAssignmentService.deleteCurrentAssignment();
    this.currentResultsService.deleteCurrentResults();
    this.currentAnswersService.deleteCurrentAnswers();
    this.aboutPlayerService.deleteAboutPlayer();
  }

  private goToNextQuestion(): void {
    this.currentQuestionIndex = Math.floor(Math.floor(Math.random() * this.questions.length));

    this.currentQuestionService.setCurrentQuestion(this.questions[this.currentQuestionIndex]);
    this.setAboutPlayer();
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

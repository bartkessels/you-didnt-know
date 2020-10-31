import { async, fakeAsync, TestBed, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { GivenAnswer } from '../models/given-answer.model';
import { Player } from '../models/player.model';
import { Quiz } from '../models/quiz.model';
import { AboutPlayerService } from './about-player.service';
import { CurrentAnswersService } from './current-answers.service';
import { CurrentAssignmentService } from './current-assignment.service';
import { CurrentQuestionService } from './current-question.service';
import { CurrentResultsService } from './current-results.service';

import { PlayGameService } from './play-game.service';
import { PlayerService } from './player.service';
import { QuizService } from './quiz.service';

describe('PlayGameService', () => {
  const currentQuestionServiceStub = {
    setCurrentQuestion: jasmine.createSpy('setCurrentQuestion'),
    getCurrentQuestion: jasmine.createSpy('getCurrentQuestion'),
    deleteCurrentQuestion: jasmine.createSpy('deleteCurrentQuestion')
  };

  const currentAssignmentServiceStub = {
    setCurrentAssignment: jasmine.createSpy('setCurrentAssignment'),
    getCurrentAssignment: jasmine.createSpy('getCurrentAssignment'),
    deleteCurrentAssignment: jasmine.createSpy('deleteCurrentAssignment')
  };

  const currentAnswerServiceStub = {
    sendAnswer: jasmine.createSpy('sendAnswer'),
    getAllAnswers: jasmine.createSpy('getAllAnswers').and.returnValue(of([])),
    setCorrectAnswer: jasmine.createSpy('setCorrectAnswer'),
    getCorrectAnswer: jasmine.createSpy('getCorrectAnswer'),
    deleteCurrentAnswers: jasmine.createSpy('deleteCurrentAnswers')
  };

  const currentResultsServiceStub = {
    setCurrentResults: jasmine.createSpy('setCurrentResults'),
    getCurrentResults: jasmine.createSpy('getCurrentResults'),
    deleteCurrentResults: jasmine.createSpy('deleteCurrentResults')
  };

  const aboutPlayerServiceStub = {
    setAboutPlayer: jasmine.createSpy('setAboutPlayer'),
    getAboutPlayer: jasmine.createSpy('getAboutPlayer'),
    deleteAboutPlayer: jasmine.createSpy('deleteAboutPlayer')
  };

  const playerServiceStub = {
    insertOrUpdatePlayer: jasmine.createSpy('insertOrUpdatePlayer'),
    getAllPlayers: jasmine.createSpy('getAllPlayers'),
    getPlayer: jasmine.createSpy('getPlayer'),
    getSelf: jasmine.createSpy('getSelf'),
    deletePlayer: jasmine.createSpy('deletePlayer')
  };

  let service: PlayGameService;
  let currentQuestionService: CurrentQuestionService;
  let currentAssignmentService: CurrentAssignmentService;
  let currentAnswersService: CurrentAnswersService;
  let currentResultsService: CurrentResultsService;
  let aboutPlayerService: AboutPlayerService;
  let playerService: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: CurrentQuestionService, useValue: currentQuestionServiceStub },
        { provide: CurrentAssignmentService, useValue: currentAssignmentServiceStub },
        { provide: CurrentAnswersService, useValue: currentAnswerServiceStub },
        { provide: CurrentResultsService, useValue: currentResultsServiceStub },
        { provide: AboutPlayerService, useValue: aboutPlayerServiceStub },
        { provide: PlayerService, useValue: playerServiceStub }
      ]
    });
    service = TestBed.inject(PlayGameService);
    currentQuestionService = TestBed.inject(CurrentQuestionService);
    currentAssignmentService = TestBed.inject(CurrentAssignmentService);
    currentAnswersService = TestBed.inject(CurrentAnswersService);
    currentResultsService = TestBed.inject(CurrentResultsService);
    aboutPlayerService = TestBed.inject(AboutPlayerService);
    playerService = TestBed.inject(PlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('startQuiz', () => {

    it('should listen for answers', () => {
      // Arrange
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);

      // Assert
      expect(currentAnswersService.getAllAnswers).toHaveBeenCalled();
    });

    it('should get all the players', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);

      // Assert
      expect(playerService.getAllPlayers).toHaveBeenCalled();
    });

    it('should set the current question when there are players and only questions', () => {
      // Arrange
      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [
          { id: '', question: '', answers: [] }
        ],
        assignments: []
      };

      const players: Player[] = [
        { id: '', name: '' },
        { id: '', name: '' }
      ];

      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of(players));

      // Act
      service.startQuiz(quiz);

      // Assert
      expect(currentQuestionService.setCurrentQuestion).toHaveBeenCalledWith(quiz.questions[0]);
    });

    it('should set the current assignment when there are players and only assignments', () => {
      // Arrange
      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: [
          { id: '', order: '', details: '', description: '' }
        ]
      };

      const players: Player[] = [
        { id: '', name: '' },
        { id: '', name: '' }
      ];

      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of(players));

      // Act
      service.startQuiz(quiz);

      // Assert
      expect(currentAssignmentService.setCurrentAssignment).toHaveBeenCalledWith(quiz.assignments[0]);
    });

    it('should set the results when all players have answered', () => {
      // Arrange
      const quiz: Quiz = {
        id: 'test',
        title: 'test',
        questions: [
          { id: '1', question: '', answers: [] }
        ],
        assignments: [
          { id: '1', order: '', details: '', description: '' }
        ]
      };

      const players: Player[] = [
        { id: '1', name: '' },
        { id: '2', name: '' }
      ];

      const answers: GivenAnswer[] = [
        { question: quiz.questions[0], player: players[0], answer: { id: '1', answer: '' } },
        { question: quiz.questions[0], player: players[0], answer: { id: '2', answer: '' } }
      ];

      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of(players));
      currentAnswersService.getCorrectAnswer = jasmine.createSpy('getCorrectAnswer').and.returnValue(of(answers[0]));
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of(answers));
      aboutPlayerService.getAboutPlayer = jasmine.createSpy('getAboutPlayer').and.returnValue(of(players[0]));

      // Act
      service.startQuiz(quiz);

      // Assert
      expect(currentResultsService.setCurrentResults).toHaveBeenCalled();
    });

    //
    //
    //
    //
    // should filter out the correct answers when all players have answered
    // should filter out the wrong answers when all players have answered
  });

  describe('resultsViewed', () => {

    it('should clear the results', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);
      service.resultsViewed();

      // Assert
      expect(currentResultsService.deleteCurrentResults).toHaveBeenCalled();
    });

    it('should clear the current question', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);
      service.resultsViewed();

      // Assert
      expect(currentQuestionService.deleteCurrentQuestion).toHaveBeenCalled();
    });

    it('should go to the next question when there are only questions', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [
          { id: 'first', question: '', answers: [] },
          { id: 'second', question: '', answers: [] }
        ],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);
      service.resultsViewed();

      // Assert
      expect(currentQuestionService.setCurrentQuestion).toHaveBeenCalledWith(quiz.questions[0] || quiz.questions[1]);
    });
  });

  describe('assignmentExecuted', () => {

    it('should clear the current assignment', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: [
          { id: '', order: '', details: '', description: '' }
        ]
      };

      // Act
      service.startQuiz(quiz);
      service.assignmentExecuted();

      // Assert
      expect(currentAssignmentService.deleteCurrentAssignment).toHaveBeenCalled();
    });

    it('should go to the next assignment when there are only assignments', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: [
          { id: 'first', order: '', details: '', description: '' },
          { id: 'second', order: '', details: '', description: '' }
        ]
      };

      // Act
      service.startQuiz(quiz);
      service.assignmentExecuted();

      // Assert
      expect(currentAssignmentService.setCurrentAssignment).toHaveBeenCalledWith(quiz.assignments[0] || quiz.assignments[1]);
    });
  });

  describe('endQuiz', () => {

    it('should clear the current question', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      // Act
      service.endQuiz();

      // Assert
      expect(currentQuestionService.deleteCurrentQuestion).toHaveBeenCalled();
    });

    it('should clear the current assignment', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      // Act
      service.endQuiz();

      // Assert
      expect(currentAssignmentService.deleteCurrentAssignment).toHaveBeenCalled();
    });

    it('should clear the current results', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      // Act
      service.endQuiz();

      // Assert
      expect(currentResultsService.deleteCurrentResults).toHaveBeenCalled();
    });

    it('should clear the about player', () => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      // Act
      service.endQuiz();

      // Assert
      expect(aboutPlayerService.deleteAboutPlayer).toHaveBeenCalled();
    });
  });
});

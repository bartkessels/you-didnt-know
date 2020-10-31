import { async, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';
import { of } from 'rxjs';
import { GivenAnswer } from '../models/given-answer.model';
import { Player } from '../models/player.model';
import { Question } from '../models/question.model';
import { Quiz } from '../models/quiz.model';
import { Results } from '../models/results.model';
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
    deleteCurrentQuestion: jasmine.createSpy('deleteCurrentQuestion').and.returnValue(of(null))
  };

  const currentAssignmentServiceStub = {
    setCurrentAssignment: jasmine.createSpy('setCurrentAssignment'),
    getCurrentAssignment: jasmine.createSpy('getCurrentAssignment'),
    deleteCurrentAssignment: jasmine.createSpy('deleteCurrentAssignment').and.returnValue(of(null))
  };

  const currentAnswerServiceStub = {
    sendAnswer: jasmine.createSpy('sendAnswer'),
    getAllAnswers: jasmine.createSpy('getAllAnswers').and.returnValue(of([])),
    setCorrectAnswer: jasmine.createSpy('setCorrectAnswer'),
    getCorrectAnswer: jasmine.createSpy('getCorrectAnswer'),
    deleteCurrentAnswers: jasmine.createSpy('deleteCurrentAnswers').and.returnValue(of(null))
  };

  const currentResultsServiceStub = {
    setCurrentResults: jasmine.createSpy('setCurrentResults'),
    getCurrentResults: jasmine.createSpy('getCurrentResults'),
    deleteCurrentResults: jasmine.createSpy('deleteCurrentResults').and.returnValue(of(null))
  };

  const aboutPlayerServiceStub = {
    setAboutPlayer: jasmine.createSpy('setAboutPlayer'),
    getAboutPlayer: jasmine.createSpy('getAboutPlayer'),
    deleteAboutPlayer: jasmine.createSpy('deleteAboutPlayer').and.returnValue(of(null))
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

    it('should listen for answers', fakeAsync(() => {
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

      // Assert
      expect(currentAnswersService.getAllAnswers).toHaveBeenCalled();
    }));

    it('should get all the players', fakeAsync(() => {
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

      // Assert
      expect(playerService.getAllPlayers).toHaveBeenCalled();
    }));

    it('should set the current question when there are players and only questions', fakeAsync(() => {
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
    }));

    it('should set the current assignment when there are players and only assignments', fakeAsync(() => {
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

      tick(2);

      // Assert
      expect(currentAssignmentService.setCurrentAssignment).toHaveBeenCalledWith(quiz.assignments[0]);
    }));

    // TODO: Fix this test!
    // it('should filter out the correct answers and wrong answers when all players have answered', fakeAsync(() => {
    //   // Arrange
    //   const quiz: Quiz = {
    //     id: 'test',
    //     title: 'test',
    //     questions: [
    //       { id: '1', question: '', answers: [] }
    //     ],
    //     assignments: []
    //   };

    //   const players: Player[] = [
    //     { id: '1', name: '' },
    //     { id: '2', name: '' },
    //     { id: '3', name: '' }
    //   ];

    //   const correctAnswer: GivenAnswer = {
    //     question: quiz.questions[0], player: players[0], answer: { id: 'correct', answer: '' }
    //   };

    //   const correctAnswers: GivenAnswer[] = [
    //     { question: quiz.questions[0], player: players[1], answer: correctAnswer.answer }
    //   ];

    //   const wrongAnswers: GivenAnswer[] = [
    //     { question: quiz.questions[0], player: players[2], answer: { id: 'wrong', answer: '' } }
    //   ];

    //   const answers: GivenAnswer[] = [
    //     correctAnswer
    //   ].concat(correctAnswers).concat(wrongAnswers);

    //   const firstExpectedResults: Results = {
    //     question: quiz.questions[0],
    //     correctAnswer,
    //     correctAnswers,
    //     wrongAnswers
    //   };

    //   const secondExpectedResults: Results = {
    //     question: quiz.questions[0],
    //     correctAnswer,
    //     wrongAnswers: correctAnswers,
    //     correctAnswers: wrongAnswers
    //   };



    //   // Act
    //   service.startQuiz(quiz);

    //   tick(2);

    //   service.setAboutPlayer();

    //   tick(2);

    //   playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of(players));
    //   currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));

    //   tick(2);

    //   currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of(answers));
    //   currentAnswersService.getCorrectAnswer = jasmine.createSpy('getCorrectAnswer').and.returnValue(of(correctAnswer));

    //   tick(2);

    //   // Assert
    //   expect(currentQuestionService.setCurrentQuestion).toHaveBeenCalledWith(quiz.questions[0]);
    //   expect(currentResultsService.setCurrentResults).toHaveBeenCalledWith(firstExpectedResults || secondExpectedResults);
    // }));
  });

  describe('resultsViewed', () => {

    it('should clear the results', fakeAsync(() => {
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

      tick(2);

      // Assert
      expect(currentResultsService.deleteCurrentResults).toHaveBeenCalled();
    }));

    it('should clear the current question', fakeAsync(() => {
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

      tick(2);

      // Assert
      expect(currentQuestionService.deleteCurrentQuestion).toHaveBeenCalled();
    }));

    it('should go to the next question when there are only questions', fakeAsync(() => {
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

      tick(2);

      // Assert
      expect(currentQuestionService.setCurrentQuestion).toHaveBeenCalledWith(quiz.questions[0] || quiz.questions[1]);
    }));
  });

  describe('assignmentExecuted', () => {

    it('should clear the current assignment', fakeAsync(() => {
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

      tick(2);

      // Assert
      expect(currentAssignmentService.deleteCurrentAssignment).toHaveBeenCalled();
    }));

    it('should go to the next assignment when there are only assignments', fakeAsync(() => {
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

      tick(2);

      // Assert
      expect(currentAssignmentService.setCurrentAssignment).toHaveBeenCalledWith(quiz.assignments[0] || quiz.assignments[1]);
    }));
  });

  describe('goToNextItem', () => {

    it('should go to the next assignment if % 3 === 0 and there are questions and assignments', fakeAsync(() => {
      // Arrange
      spyOn(Math, 'floor').and.returnValue(3);

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [
          { id: 'q', question: '', answers: [] }
        ],
        assignments: [
          { id: 'first', order: '', details: '', description: '' },
          { id: 'second', order: '', details: '', description: '' }
        ]
      };

      // Act
      service.startQuiz(quiz);

      tick(2);

      // Assert
      expect(currentAssignmentService.setCurrentAssignment).toHaveBeenCalled();
    }));

    it('should go to the next assigment if % 3 !== 0 but there are no more question and there are assignments', fakeAsync(() => {
      // Arrange
      spyOn(Math, 'floor').and.returnValue(2);

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

      tick(2);

      // Assert
      expect(currentAssignmentService.setCurrentAssignment).toHaveBeenCalled();
    }));

    it('should go to the next question if % 3 !== 0 and there are questions but there are no assignments', fakeAsync(() => {
      // Arrange
      spyOn(Math, 'floor').and.returnValue(2);

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [
          { id: 'q', question: '', answers: [] }
        ],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);

      tick(2);

      // Assert
      expect(currentQuestionService.setCurrentQuestion).toHaveBeenCalled();
    }));

    it('should go to the next question if % 3 === 0 but there are no more assignments', fakeAsync(() => {
      // Arrange
      spyOn(Math, 'floor').and.returnValue(3);

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [
          { id: 'q', question: '', answers: [] }
        ],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);

      tick(2);

      // Assert
      expect(currentQuestionService.setCurrentQuestion).toHaveBeenCalled();
    }));

    it('should end the quiz when % 3 === 0 but there are no questions or assignments', fakeAsync(() => {
      // Arrange
      spyOn(Math, 'floor').and.returnValue(3);

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);

      tick(2);

      // Assert
      expect(currentQuestionService.deleteCurrentQuestion).toHaveBeenCalled();
      expect(currentAssignmentService.deleteCurrentAssignment).toHaveBeenCalled();
    }));

    it('should en the quiz when %3 !== 0 and there are no questions or assignments', fakeAsync(() => {
      // Arrange
      spyOn(Math, 'floor').and.returnValue(2);

      const quiz: Quiz = {
        id: '',
        title: '',
        questions: [],
        assignments: []
      };

      // Act
      service.startQuiz(quiz);

      tick(2);

      // Assert
      expect(currentQuestionService.deleteCurrentQuestion).toHaveBeenCalled();
      expect(currentAssignmentService.deleteCurrentAssignment).toHaveBeenCalled();
    }));
  });

  describe('endQuiz', () => {

    it('should clear the current question', fakeAsync(() => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      // Act
      service.endQuiz();

      tick(2);

      // Assert
      expect(currentQuestionService.deleteCurrentQuestion).toHaveBeenCalled();
    }));

    it('should clear the current assignment', fakeAsync(() => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      // Act
      service.endQuiz();

      tick(2);

      // Assert
      expect(currentAssignmentService.deleteCurrentAssignment).toHaveBeenCalled();
    }));

    it('should clear the current results', fakeAsync(() => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      // Act
      service.endQuiz();

      tick(2);

      // Assert
      expect(currentResultsService.deleteCurrentResults).toHaveBeenCalled();
    }));

    it('should clear the about player', fakeAsync(() => {
      // Arrange
      currentAnswersService.getAllAnswers = jasmine.createSpy('getAllAnswers').and.returnValue(of([]));
      playerService.getAllPlayers = jasmine.createSpy('getAllPlayers').and.returnValue(of([]));

      // Act
      service.endQuiz();

      tick(2);

      // Assert
      expect(aboutPlayerService.deleteAboutPlayer).toHaveBeenCalled();
    }));
  });
});

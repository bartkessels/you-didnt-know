import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Quiz } from '../models/quiz.model';

import { QuizService } from './quiz.service';

describe('QuizService', () => {
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges'),
      doc: jasmine.createSpy('doc').and.returnValue({
        set: jasmine.createSpy('set'),
        valueChanges: jasmine.createSpy('valueChanges')
      })
    })
  };

  let service: QuizService;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        QuizService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.inject(QuizService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  it('should get the doc with the quiz id when trying to create or update a quiz', () => {
    // Arrange
    const expectedQuizId = '312';

    const quiz: Quiz = {
      id: expectedQuizId,
      title: 'This is my new quiz',
      questions: [],
      assignments: []
    };

    // Act
    service.insertOrUpdateQuiz(quiz);

    // Assert
    expect(angularFirestore.collection('quizzes').doc).toHaveBeenCalledWith(expectedQuizId);
  });

  it('Should set the given quiz to update in the firestore collection', () => {
    // Arrange
    const quiz: Quiz = {
      id: 'quiz1',
      title: 'This is my new quiz',
      questions: [],
      assignments: []
    };

    // Act
    service.insertOrUpdateQuiz(quiz);

    // Assert
    expect(angularFirestore.collection('quizzes').doc(quiz.id).set).toHaveBeenCalledWith(quiz);
  });

  it('Should call valueChanges on the collection directly to get all quizzes', () => {
    // Act
    service.getAllQuizzes();

    // Assert
    expect(angularFirestore.collection('quizzes').valueChanges).toHaveBeenCalled();
  });

  it('should get the quiz based on the quiz id which is set as the doc id in firestore', () => {
    // Arrange
    const expectedQuizId = 'quiz1';

    // Act
    service.getQuiz(expectedQuizId);

    // Assert
    expect(angularFirestore.collection('quizzes').doc).toHaveBeenCalledWith(expectedQuizId);
  });
});

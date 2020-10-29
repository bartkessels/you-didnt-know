import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Question } from '../models/question.model';

import { CurrentQuestionService } from './current-question.service';

describe('CurrentQuestionService', () => {
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges'),
      doc: jasmine.createSpy('doc').and.returnValue({
        set: jasmine.createSpy('set'),
        valueChanges: jasmine.createSpy('valueChanges'),
        delete: jasmine.createSpy('delete')
      })
    })
  };

  let service: CurrentQuestionService;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentQuestionService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.inject(CurrentQuestionService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  it('should get the "current" doc when current question is set', () => {
    // Arrange
    const expectedDocumentName = 'current';

    const question: Question = {
      id: 'q',
      question: 'My question',
      answers: []
    };

    // Act
    service.setCurrentQuestion(question);

    // Assert
    expect(angularFirestore.collection('current-question').doc).toHaveBeenCalledWith(expectedDocumentName);
  });

  it('should set the given question in the firestore collection', () => {
    // Arrange
    const documentName = 'current';

    const question: Question = {
      id: 'q',
      question: 'My question',
      answers: []
    };

    // Act
    service.setCurrentQuestion(question);

    // Assert
    expect(angularFirestore.collection('current-question').doc(documentName).set).toHaveBeenCalledWith(question);
  });

  it('should call the current question based on the "current" doc id', () => {
    // Arrange
    const documentName = 'current';

    // Act
    service.getCurrentQuestion();

    // Assert
    expect(angularFirestore.collection('current-question').doc(documentName).valueChanges).toHaveBeenCalled();
  });

  it('should call delete on the "current" doc id', () => {
    // Arrange
    const documentName = 'current';

    // Act
    service.deleteCurrentQuestion();

    // Assert
    expect(angularFirestore.collection('current-question').doc(documentName).delete).toHaveBeenCalled();
  });
});

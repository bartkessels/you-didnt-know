import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Answer } from '../models/answer.model';
import { GivenAnswer } from '../models/given-answer.model';
import { Player } from '../models/player.model';
import { Question } from '../models/question.model';

import { CurrentAnswersService } from './current-answers.service';

describe('CurrentAnswersService', () => {
  const angularFirestoreStub = {
    collection: jasmine.createSpy('collection').and.returnValue({
      valueChanges: jasmine.createSpy('valueChanges'),
      add: jasmine.createSpy('add'),
      doc: jasmine.createSpy('doc').and.returnValue({
        set: jasmine.createSpy('set'),
        valueChanges: jasmine.createSpy('valueChanges').and.returnValue({
          toPromise: jasmine.createSpy('toPromise')
        }),
        delete: jasmine.createSpy('delete')
      })
    })
  };

  let service: CurrentAnswersService;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentAnswersService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.inject(CurrentAnswersService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  it('should use the player id as the document name for the given answer', fakeAsync(() => {
    // Arrange
    const expectedDocumentId = 'my-doc';
    const question: Question = { id: '', question: '', answers: [] };
    const answer: Answer = { id: '', answer: '' };
    const player: Player = { id: expectedDocumentId, name: '' };

    // Act
    service.sendAnswer(question, answer, player);

    tick(2);

    // Assert
    expect(angularFirestore.collection('answers').doc).toHaveBeenCalledWith(expectedDocumentId);
  }));

  it('should set the given answer on the document', fakeAsync(() => {
    // Arrange
    const documentId = 'my-doc';
    const question: Question = { id: '', question: '', answers: [] };
    const answer: Answer = { id: '', answer: '' };
    const player: Player = { id: documentId, name: '' };

    // Act
    service.sendAnswer(question, answer, player);

    tick(2);

    // Assert
    expect(angularFirestore.collection('answers').doc(documentId).set).toHaveBeenCalledWith({ question, answer, player });
  }));

  it('Should call valueChanges on the collection directly when getAllAnswers is called', fakeAsync(() => {
    // Act
    service.getAllAnswers();

    tick(2);

    // Assert
    expect(angularFirestore.collection('answers').valueChanges).toHaveBeenCalled();
  }));

  it('should store the givenAnswer in the "correct-answer" document when setCorrectAnswer is called', fakeAsync(() => {
    // Arrange
    const expectedDocumentName = 'correct-answer';
    const question: Question = { id: '', question: '', answers: [] };
    const player: Player = { id: '', name: '' };
    const answer: Answer = { id: '', answer: '' };

    // Act
    service.setCorrectAnswer( question, answer, player);

    tick(2);

    // Assert
    expect(angularFirestore.collection('answers').doc).toHaveBeenCalledWith(expectedDocumentName);
  }));

  it('should create a new GivenAnswer object with the answer and player objects when setCorrectAnswer is called', fakeAsync(() => {
    // Arrange
    const documentName = 'correct-answer';
    const question: Question = { id: '', question: '', answers: [] };
    const player: Player = { id: '', name: '' };
    const answer: Answer = { id: '', answer: '' };

    // Act
    service.setCorrectAnswer(question, answer, player);

    tick(2);

    // Assert
    expect(angularFirestore.collection('answers').doc(documentName).set).toHaveBeenCalledWith({ question, player, answer});
  }));

  it('should get the correct answer based on the correct-answer document', fakeAsync(() => {
    // Arrange
    const expectedDocumentName = 'correct-answer';

    // Act
    service.getCorrectAnswer();

    tick(2);

    // Assert
    expect(angularFirestore.collection('answers').doc).toHaveBeenCalledWith(expectedDocumentName);
  }));

  it('should retrieve the givenAnswer from the "correct-answer" document when getCorrectAnswer is called', fakeAsync(() => {
    // Arrange
    const documentName = 'correct-answer';

    // Act
    service.getCorrectAnswer();

    tick(2);

    // Assert
    expect(angularFirestore.collection('answers').doc(documentName).valueChanges).toHaveBeenCalled();
  }));
});

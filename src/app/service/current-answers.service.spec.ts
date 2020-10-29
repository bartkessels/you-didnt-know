import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Answer } from '../models/answer.model';
import { GivenAnswer } from '../models/given-answer.model';
import { Player } from '../models/player.model';

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

  it('should create a new GivenAnswer object with the answer and player objects when sendAnswer is called', () => {
    // Arrange
    const answer: Answer = { id: '', answer: '' };
    const player: Player = { id: '', name: '' };

    // Act
    service.sendAnswer(answer, player);

    // Assert
    expect(angularFirestore.collection('answers').add).toHaveBeenCalledWith({ answer, player });
  });

  it('Should call valueChanges on the collection directly when getAllAnswers is called', () => {
    // Act
    service.getAllAnswers();

    // Assert
    expect(angularFirestore.collection('answers').valueChanges).toHaveBeenCalled();
  });

  it('should store the givenAnswer in the "correct-answer" document when setCorrectAnswer is called', () => {
    // Arrange
    const expectedDocumentName = 'correct-answer';
    const player: Player = { id: '', name: '' };
    const answer: Answer = { id: '', answer: '' };

    // Act
    service.setCorrectAnswer(answer, player);

    // Assert
    expect(angularFirestore.collection('answers').doc).toHaveBeenCalledWith(expectedDocumentName);
  });

  it('should create a new GivenAnswer object with the answer and player objects when setCorrectAnswer is called', () => {
    // Arrange
    const documentName = 'correct-answer';
    const player: Player = { id: '', name: '' };
    const answer: Answer = { id: '', answer: '' };

    // Act
    service.setCorrectAnswer(answer, player);

    // Assert
    expect(angularFirestore.collection('answers').doc(documentName).set).toHaveBeenCalledWith({player, answer});
  });
  // should retrieve the givenAnswer from the "correct-answer" document when getCorrectAnswer is called

  it('should create a new GivenAnswer object with the answer and player objects when setCorrectAnswer is called', () => {
    // Arrange
    const expectedDocumentName = 'correct-answer';

    // Act
    service.getCorrectAnswer();

    // Assert
    expect(angularFirestore.collection('answers').doc).toHaveBeenCalledWith(expectedDocumentName);
  });
});

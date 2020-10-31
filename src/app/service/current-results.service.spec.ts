import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Results } from '../models/results.model';

import { CurrentResultsService } from './current-results.service';

describe('CurrentResultsService', () => {
  const firestoreStub = {
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

  let service: CurrentResultsService;
  let firestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: firestoreStub }
      ]
    });
    service = TestBed.inject(CurrentResultsService);
    firestore = TestBed.inject(AngularFirestore);
  });

  it('should use "current" as the document name when storing', fakeAsync(() => {
    // Arrange
    const expectedDocumentId = 'current';
    const results: Results = {
      question: null,
      wrongAnswers: [],
      correctAnswers: [],
      correctAnswer: null
    };

    // Act
    service.setCurrentResults(results);

    tick(2);

    // Assert
    expect(firestore.collection('result').doc).toHaveBeenCalledWith(expectedDocumentId);
  }));

  it('should set the given results on the document', fakeAsync(() => {
    // Arrange
    const documentId = 'current';
    const results: Results = {
      question: null,
      wrongAnswers: [],
      correctAnswers: [],
      correctAnswer: null
    };

    // Act
    service.setCurrentResults(results);

    tick(2);

    // Assert
    expect(firestore.collection('result').doc(documentId).set).toHaveBeenCalledWith(results);
  }));

  it('Should call valueChanges on the document when getCurrentResults is called', fakeAsync(() => {
    // Arrange
    const documentId = 'current';

    // Act
    service.getCurrentResults();

    tick(2);

    // Assert
    expect(firestore.collection('result').doc(documentId).valueChanges).toHaveBeenCalled();
  }));

  it('should use the documentId "current" when deleteCurrentResults is called', () => {
    // Arrange
    const expectedDocumentId = 'current';

    // Act
    service.deleteCurrentResults();

    // Assert
    expect(firestore.collection('result').doc).toHaveBeenCalledWith(expectedDocumentId);
  });

  it('should call delete on the document when deleteCurrentResults is called', () => {
    // Arrange
    const documentId = 'current';

    // Act
    service.deleteCurrentResults();

    // Assert
    expect(firestore.collection('result').doc(documentId).delete).toHaveBeenCalled();
  });
});

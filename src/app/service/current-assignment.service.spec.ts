import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Assignment } from '../models/assignment.model';

import { CurrentAssignmentService } from './current-assignment.service';

describe('CurrentAssignmentService', () => {
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

  let service: CurrentAssignmentService;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CurrentAssignmentService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.inject(CurrentAssignmentService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  it('should get the "current" doc when current assignment is set', () => {
    // Arrange
    const expectedDocumentName = 'current';

    const assignment: Assignment = {
      id: 'q',
      order: 'This is a order',
      details: 'So execute it!',
      description: 'With these steps'
    };

    // Act
    service.setCurrentAssignment(assignment);

    // Assert
    expect(angularFirestore.collection('current-assignment').doc).toHaveBeenCalledWith(expectedDocumentName);
  });

  it('should set the given assignment in the firestore collection', () => {
    // Arrange
    const documentName = 'current';

    const assignment: Assignment = {
      id: 'q',
      order: 'This is a order',
      details: 'So execute it!',
      description: 'With these steps'
    };

    // Act
    service.setCurrentAssignment(assignment);

    // Assert
    expect(angularFirestore.collection('current-assignment').doc(documentName).set).toHaveBeenCalledWith(assignment);
  });

  it('should call the current assigment based on the "current" doc id', () => {
    // Arrange
    const documentName = 'current';

    // Act
    service.getCurrentAssignment();

    // Assert
    expect(angularFirestore.collection('current-assignment').doc(documentName).valueChanges).toHaveBeenCalled();
  });

  it('should call delete on the "current" doc id', () => {
    // Arrange
    const documentName = 'current';

    // Act
    service.deleteCurrentAssignment();

    // Assert
    expect(angularFirestore.collection('current-assignment').doc(documentName).delete).toHaveBeenCalled();
  });
});

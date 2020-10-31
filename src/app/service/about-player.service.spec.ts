import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from '../models/player.model';

import { AboutPlayerService } from './about-player.service';

describe('AboutPlayerService', () => {
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

  let service: AboutPlayerService;
  let firestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });
    service = TestBed.inject(AboutPlayerService);
    firestore = TestBed.inject(AngularFirestore);
  });

  it('should use "current" as the document name', fakeAsync(() => {
    // Arrange
    const expectedDocumentId = 'current';
    const player: Player = {
      id: '1',
      name: ''
    };

    // Act
    service.setAboutPlayer(player);

    tick(2);

    // Assert
    expect(firestore.collection('about-player').doc).toHaveBeenCalledWith(expectedDocumentId);
  }));

  it('should set the given player on the document', fakeAsync(() => {
    // Arrange
    const documentId = 'current';
    const expectedPlayer: Player = {
      id: '1',
      name: ''
    };

    // Act
    service.setAboutPlayer(expectedPlayer);

    tick(2);

    // Assert
    expect(firestore.collection('about-player').doc(documentId).set).toHaveBeenCalledWith(expectedPlayer);
  }));

  it('Should call valueChanges on the document when getAboutPlayer is called', fakeAsync(() => {
    // Arrange
    const documentId = 'current';

    // Act
    service.getAboutPlayer();

    tick(2);

    // Assert
    expect(firestore.collection('about-player').doc(documentId).valueChanges).toHaveBeenCalled();
  }));

  it('should use the documentId "current" when deleteAboutPlayer is called', fakeAsync(() => {
    // Arrange
    const expectedDocumentId = 'current';

    // Act
    service.deleteAboutPlayer();

    tick(2);

    // Assert
    expect(firestore.collection('about-player').doc).toHaveBeenCalledWith(expectedDocumentId);
  }));

  it('should call delete on the document when deleteAboutPlayer is called', fakeAsync(() => {
    // Arrange
    const documentId = 'current';

    // Act
    service.deleteAboutPlayer();

    tick(2);

    // Assert
    expect(firestore.collection('about-player').doc(documentId).delete).toHaveBeenCalled();
  }));
});

import { fakeAsync, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { Player } from '../models/player.model';

import { PlayerService } from './player.service';

describe('PlayerService', () => {
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

  let service: PlayerService;
  let angularFirestore: AngularFirestore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlayerService,
        { provide: AngularFirestore, useValue: angularFirestoreStub }
      ]
    });

    service = TestBed.inject(PlayerService);
    angularFirestore = TestBed.inject(AngularFirestore);
  });

  it('should get the doc with the player id when trying to create or update a player', () => {
    // Arrange
    const expectedPlayerId = '312';

    const player: Player = {
      id: expectedPlayerId,
      name: 'Bart'
    };

    // Act
    service.insertOrUpdatePlayer(player);

    // Assert
    expect(angularFirestore.collection('players').doc).toHaveBeenCalledWith(expectedPlayerId);
  });

  it('Should set the given player to update in the firestore collection', () => {
    // Arrange
    const player: Player = {
      id: 'none',
      name: 'Bart'
    };

    // Act
    service.insertOrUpdatePlayer(player);

    // Assert
    expect(angularFirestore.collection('players').doc(player.id).set).toHaveBeenCalledWith(player);
  });

  it('Should call valueChanges on the collection directly to get all players', () => {
    // Act
    service.getAllPlayers();

    // Assert
    expect(angularFirestore.collection('players').valueChanges).toHaveBeenCalled();
  });

  it('should get the player based on the player id which is set as the doc id in firestore', () => {
    // Arrange
    const expectedPlayerId = 'player1';

    // Act
    service.getPlayer(expectedPlayerId);

    // Assert
    expect(angularFirestore.collection('players').doc).toHaveBeenCalledWith(expectedPlayerId);
  });

  it('should get the player based on the playerId in the localstorage', () => {
    // Arrange
    const expectedPlayerId = 'player1';

    spyOn(localStorage, 'getItem').and.returnValue(expectedPlayerId);

    // Act
    service.getSelf();

    // Assert
    expect(angularFirestore.collection('players').doc).toHaveBeenCalledWith(expectedPlayerId);
  });

  it('should delete the player based on the player id which is set as the doc id in firestore', () => {
    // Arrange
    const player: Player = {
      id: '1',
      name: ''
    };

    // Act
    service.deletePlayer(player);

    // Assert
    expect(angularFirestore.collection('players').doc).toHaveBeenCalledWith(player.id);
  });

  it('should call delete on the doc with the player id', () => {
    // Arrange
    const player: Player = {
      id: '1',
      name: ''
    };

    // Act
    service.deletePlayer(player);

    // Assert
    expect(angularFirestore.collection('players').doc(player.id).delete).toHaveBeenCalled();
  });
});

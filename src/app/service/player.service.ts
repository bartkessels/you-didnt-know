import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private readonly localStorageKeyPlayer = 'playerId';
  private readonly firestoreCollectionName = 'players';

  constructor(private firestore: AngularFirestore) { }

  public insertOrUpdatePlayer(player: Player): void {
    localStorage.setItem(this.localStorageKeyPlayer, player.id);

    this.firestore.collection<Player>(this.firestoreCollectionName)
      .doc<Player>(player.id)
      .set(player);
  }

  public getAllPlayers(): Observable<Player[]> {
    return this.firestore.collection<Player>(this.firestoreCollectionName)
      .valueChanges();
  }

  public getPlayer(playerId: string): Observable<Player> {
    return this.firestore.collection<Player>(this.firestoreCollectionName)
      .doc<Player>(playerId)
      .valueChanges();
  }

  public getSelf(): Observable<Player> {
    const playerId = localStorage.getItem(this.localStorageKeyPlayer);
    return this.getPlayer(playerId);
  }

  public deletePlayer(player: Player): void {
    this.firestore.collection<Player>(this.firestoreCollectionName)
      .doc(player.id)
      .delete();
  }
}

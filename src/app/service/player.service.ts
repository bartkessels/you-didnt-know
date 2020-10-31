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

  public async insertOrUpdatePlayer(player: Player): Promise<void> {
    localStorage.setItem(this.localStorageKeyPlayer, player.id);

    await this.firestore.collection<Player>(this.firestoreCollectionName)
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

  public async deletePlayer(player: Player): Promise<void> {
    await this.firestore.collection<Player>(this.firestoreCollectionName)
      .doc(player.id)
      .delete();
  }

  public deleteAllPlayers(): void {
    this.firestore.collection<Player>(this.firestoreCollectionName)
      .snapshotChanges()
      .subscribe(actions => {
        actions.map(async d => {
          await this.firestore.collection<Player>(this.firestoreCollectionName)
            .doc(d.payload.doc.id)
            .delete();
        });
      });
  }
}

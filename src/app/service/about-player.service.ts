import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class AboutPlayerService {
  private readonly firestoreCollectionName = 'about-player';
  private readonly firestoreDocumentName = 'current';

  constructor(private firestore: AngularFirestore) { }

  public async setAboutPlayer(results: Player): Promise<void> {
    await this.firestore.collection<Player>(this.firestoreCollectionName)
      .doc<Player>(this.firestoreDocumentName)
      .set(results);
  }

  public getAboutPlayer(): Observable<Player> {
    return this.firestore.collection<Player>(this.firestoreCollectionName)
      .doc<Player>(this.firestoreDocumentName)
      .valueChanges();
  }

  public async deleteAboutPlayer(): Promise<void> {
    await this.firestore.collection<Player>(this.firestoreCollectionName)
      .doc<Player>(this.firestoreDocumentName)
      .delete();
  }
}

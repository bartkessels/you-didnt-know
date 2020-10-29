import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Results } from '../models/results.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentResultsService {
  private readonly firestoreCollectionName = 'result';
  private readonly firestoreDocumentName = 'current';

  constructor(private firestore: AngularFirestore) { }

  public async setCurrentResults(results: Results): Promise<void> {
    await this.firestore.collection<Results>(this.firestoreCollectionName)
      .doc<Results>(this.firestoreDocumentName)
      .set(results);
  }

  public getCurrentResults(): Observable<Results> {
    return this.firestore.collection<Results>(this.firestoreCollectionName)
      .doc<Results>(this.firestoreDocumentName)
      .valueChanges();
  }

  public async deleteCurrentResults(): Promise<void> {
    await this.firestore.collection<Results>(this.firestoreCollectionName)
      .doc<Results>(this.firestoreDocumentName)
      .delete();
  }
}

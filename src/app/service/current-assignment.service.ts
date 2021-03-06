import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentAssignmentService {
  private readonly firestoreCollectionName = 'assignment';
  private readonly firestoreDocName = 'current';

  constructor(private firestore: AngularFirestore) { }

  public async setCurrentAssignment(assignment: Assignment): Promise<void> {
    await this.firestore.collection<Assignment>(this.firestoreCollectionName)
      .doc<Assignment>(this.firestoreDocName)
      .set(assignment);
  }

  public getCurrentAssignment(): Observable<Assignment> {
    return this.firestore.collection<Assignment>(this.firestoreCollectionName)
      .doc<Assignment>(this.firestoreDocName)
      .valueChanges();
  }

  public async deleteCurrentAssignment(): Promise<void> {
    await this.firestore.collection<Assignment>(this.firestoreCollectionName)
      .doc<Assignment>(this.firestoreDocName)
      .delete();
  }
}

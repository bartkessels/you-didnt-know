import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentQuestionService {
  private readonly firestoreCollectionName = 'question';
  private readonly firestoreDocName = 'current';

  constructor(private firestore: AngularFirestore) { }

  public setCurrentQuestion(question: Question): void {
    this.firestore.collection<Question>(this.firestoreCollectionName)
      .doc<Question>(this.firestoreDocName)
      .set(question);
  }

  public getCurrentQuestion(): Observable<Question> {
    return this.firestore.collection<Question>(this.firestoreCollectionName)
      .doc<Question>(this.firestoreDocName)
      .valueChanges();
  }

  public deleteCurrentQuestion(): void {
    this.firestore.collection<Question>(this.firestoreCollectionName)
      .doc<Question>(this.firestoreDocName)
      .delete();
  }
}

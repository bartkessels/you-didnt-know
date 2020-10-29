import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Quiz } from '../models/quiz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private readonly firestoreCollectionName = 'quizzes';

  constructor(private firestore: AngularFirestore) { }

  public async insertOrUpdateQuiz(quiz: Quiz): Promise<void> {
    await this.firestore.collection(this.firestoreCollectionName)
      .doc(quiz.id)
      .set(quiz);
  }

  public getAllQuizzes(): Observable<Quiz[]> {
    return this.firestore.collection<Quiz>(this.firestoreCollectionName)
      .valueChanges();
  }

  public getQuiz(quizId: string): Observable<Quiz> {
    return this.firestore.collection<Quiz>(this.firestoreCollectionName)
      .doc<Quiz>(quizId)
      .valueChanges();
  }
}

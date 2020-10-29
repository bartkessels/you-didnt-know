import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Answer } from '../models/answer.model';
import { GivenAnswer } from '../models/given-answer.model';
import { Player } from '../models/player.model';
import { Question } from '../models/question.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentAnswersService {
  private readonly firestoreCollectionName = 'answers';
  private readonly firestoreCorrectAnswerDocName = 'correct-answer';

  constructor(private firestore: AngularFirestore) { }

  public async sendAnswer(question: Question, answer: Answer, player: Player): Promise<void> {
    const givenAnswer: GivenAnswer = { question, answer, player };

    await this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .doc(player.id)
      .set(givenAnswer);
  }

  public getAllAnswers(): Observable<GivenAnswer[]> {
    return this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .valueChanges();
  }

  public async setCorrectAnswer(question: Question,answer: Answer, player: Player): Promise<void> {
    const givenAnswer: GivenAnswer = { question, answer, player };

    this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .doc<GivenAnswer>(this.firestoreCorrectAnswerDocName)
      .set(givenAnswer);
  }

  public getCorrectAnswer(): Observable<GivenAnswer> {
    return this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .doc<GivenAnswer>(this.firestoreCorrectAnswerDocName)
      .valueChanges();
  }

  public deleteCurrentAnswers(): void {
    this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .snapshotChanges()
      .subscribe(actions => {
        actions.map(async u => {
          await this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
            .doc(u.payload.doc.id)
            .delete();
        });
      });
  }
}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Answer } from '../models/answer.model';
import { GivenAnswer } from '../models/given-answer.model';
import { Player } from '../models/player.model';

@Injectable({
  providedIn: 'root'
})
export class CurrentAnswersService {
  private readonly firestoreCollectionName = 'answers';
  private readonly fireststoreCorrectAnswerDocName = 'correct-answer';

  constructor(private firestore: AngularFirestore) { }

  public async sendAnswer(answer: Answer, player: Player): Promise<void> {
    const givenAnswer: GivenAnswer = { answer, player };

    await this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .add(givenAnswer);
  }

  public getAllAnswers(): Observable<GivenAnswer[]> {
    return this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .valueChanges();
  }

  public async setCorrectAnswer(answer: Answer, player: Player): Promise<void> {
    const givenAnswer: GivenAnswer = { answer, player };

    this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .doc<GivenAnswer>(this.fireststoreCorrectAnswerDocName)
      .set(givenAnswer);
  }

  public getCorrectAnswer(): Observable<GivenAnswer> {
    return this.firestore.collection<GivenAnswer>(this.firestoreCollectionName)
      .doc<GivenAnswer>(this.fireststoreCorrectAnswerDocName)
      .valueChanges();
  }
}

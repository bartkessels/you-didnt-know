import { Answer } from './answer.model';
import { Player } from './player.model';
import { Question } from './question.model';

export interface GivenAnswer {
  question: Question;
  player: Player;
  answer: Answer;
}

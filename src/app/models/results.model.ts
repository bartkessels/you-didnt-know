import { GivenAnswer } from './given-answer.model';
import { Question } from './question.model';

export interface Results {
  question: Question;
  wrongAnswers: GivenAnswer[];
  correctAnswers: GivenAnswer[];
}

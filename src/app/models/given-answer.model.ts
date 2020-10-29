import { Answer } from './answer.model';
import { Player } from './player.model';

export interface GivenAnswer {
  player: Player;
  answer: Answer;
}

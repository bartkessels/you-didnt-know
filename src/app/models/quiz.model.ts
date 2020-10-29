import { Assignment } from './assignment.model';
import { Question } from './question.model';

export interface Quiz {
  id: string;
  title: string;
  questions: Question[];
  assignments: Assignment[];
}

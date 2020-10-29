import { Location } from '@angular/common';
import { ComponentFixture, inject, TestBed, waitForAsync } from '@angular/core/testing';
import { Quiz } from 'src/app/models/quiz.model';

import { QuizListItemCardComponent } from './quiz-list-item-card.component';

describe('QuizListItemCardComponent', () => {
  let component: QuizListItemCardComponent;
  let location: Location;
  let fixture: ComponentFixture<QuizListItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizListItemCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizListItemCardComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
  });

  it('should display the quiz title', () => {
    // Arrange
    const quiz: Quiz = {
      id: 'quiz_id',
      title: 'This is my quiz',
      questions: [],
      assignments: []
    };

    component.quiz = quiz;
    fixture.detectChanges();

    // Act
    const matCardTitle: HTMLElement = fixture.nativeElement.querySelector('mat-card-title');

    // Assert
    expect(matCardTitle.textContent).toEqual(quiz.title);
  });

  it('should display the number of questions and assignments', () => {
    // Arrange
    const quiz: Quiz = {
      id: 'quiz_id',
      title: 'This is my quiz',
      questions: [
        { id: '', question: '', answers: [] }
      ],
      assignments: [
        { id: '', order: '', details: '', description: '' },
        { id: '', order: '', details: '', description: '' },
        { id: '', order: '', details: '', description: '' }
      ]
    };

    component.quiz = quiz;
    fixture.detectChanges();

    // No need to break the line between the questions and assignments
    const expectedSubtitle = `${quiz.questions.length} question(s)${quiz.assignments.length} assignment(s)`;

    // Act
    const matCardSubtitle: HTMLElement = fixture.nativeElement.querySelector('mat-card-subtitle');

    // Assert
    expect(matCardSubtitle.textContent).toEqual(expectedSubtitle);
  });

  it('should go to the lobby route with the quiz id', waitForAsync(() => {
    // Arrange
    const quiz: Quiz = {
      id: 'quiz_id',
      title: 'This is my quiz',
      questions: [],
      assignments: []
    };

    component.quiz = quiz;
    fixture.detectChanges();

    const expectedRouterLink = `/host/lobby/${quiz.id}`;

    // Act
    const playQuizButton: HTMLElement = fixture.nativeElement.querySelector('#play-quiz');

    // Assert
    expect(playQuizButton.getAttribute('href')).toEqual(expectedRouterLink);
  }));

  it('should go to the edit route with the quiz id', waitForAsync(() => {
    // Arrange
    const quiz: Quiz = {
      id: 'quiz_id',
      title: 'This is my quiz',
      questions: [],
      assignments: []
    };

    component.quiz = quiz;
    fixture.detectChanges();

    const expectedRouterLink = `/host/update-quiz/${quiz.id}`;

    // Act
    const playQuizButton: HTMLElement = fixture.nativeElement.querySelector('#update-quiz');

    // Assert
    expect(playQuizButton.getAttribute('href')).toEqual(expectedRouterLink);
  }));

  it('should go to the delete route with the quiz id', waitForAsync(() => {
    // Arrange
    const quiz: Quiz = {
      id: 'quiz_id',
      title: 'This is my quiz',
      questions: [],
      assignments: []
    };

    component.quiz = quiz;
    fixture.detectChanges();

    const expectedRouterLink = `/host/delete-quiz/${quiz.id}`;

    // Act
    const playQuizButton: HTMLElement = fixture.nativeElement.querySelector('#delete-quiz');

    // Assert
    expect(playQuizButton.getAttribute('href')).toEqual(expectedRouterLink);
  }));
});

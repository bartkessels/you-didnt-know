import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';
import { Quiz } from 'src/app/models/quiz.model';
import { QuizService } from 'src/app/service/quiz.service';

import { DeleteQuizComponent } from './delete-quiz.component';

describe('DeleteQuizComponent', () => {
  const quizId = 'my-quiz-id';
  const activatedRouteStub = {
    params: of({ quizId })
  };

  const quizServiceStub = {
    getQuiz: jasmine.createSpy('getQuiz').and.returnValue(of<Quiz>({
      id: quizId,
      title: '',
      questions: [],
      assignments: []
    })),
    deleteQuiz: jasmine.createSpy('deleteQuiz')
  };

  const routerStub = {
    navigateByUrl: jasmine.createSpy('navigateByUrl')
  };

  let component: DeleteQuizComponent;
  let fixture: ComponentFixture<DeleteQuizComponent>;
  let quizService: QuizService;
  let router: Router;
  let activatedRoute: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteQuizComponent ],
      providers: [
        { provide: QuizService, useValue: quizServiceStub },
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteQuizComponent);
    component = fixture.componentInstance;
    quizService = TestBed.inject(QuizService);
    router = TestBed.inject(Router);
    activatedRoute = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should set the quiz member based on the given quizId from the route params', () => {
    // Expect
    expect(quizService.getQuiz).toHaveBeenCalledWith(quizId);
  });

  it('should call deleteQuiz with the quizId from the route params on the quizService', fakeAsync(() => {
    // Arrange
    const deleteQuizButton: HTMLElement = fixture.nativeElement.querySelector('#delete-quiz');

    // Act
    deleteQuizButton.click();

    // Assert
    expect(quizService.deleteQuiz).toHaveBeenCalledWith(quizId);
  }));

  it('should navigate to dashboard after deleting the quiz', fakeAsync(() => {
    // Arrange
    const deleteQuizButton: HTMLElement = fixture.nativeElement.querySelector('#delete-quiz');

    // Act
    deleteQuizButton.click();

    // Assert
    expect(router.navigateByUrl).toHaveBeenCalledWith('/host/dashboard');
  }));
});

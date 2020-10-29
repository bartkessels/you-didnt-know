import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizOutroComponent } from './quiz-outro.component';

describe('QuizOutroComponent', () => {
  let component: QuizOutroComponent;
  let fixture: ComponentFixture<QuizOutroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuizOutroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizOutroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

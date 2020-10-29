import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostPlayingQuizToolbarComponent } from './host-playing-quiz-toolbar.component';

describe('HostPlayingQuizToolbarComponent', () => {
  let component: HostPlayingQuizToolbarComponent;
  let fixture: ComponentFixture<HostPlayingQuizToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HostPlayingQuizToolbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostPlayingQuizToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

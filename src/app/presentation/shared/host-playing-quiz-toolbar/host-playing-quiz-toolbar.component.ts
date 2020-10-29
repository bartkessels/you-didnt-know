import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-host-playing-quiz-toolbar',
  templateUrl: './host-playing-quiz-toolbar.component.html',
  styleUrls: ['./host-playing-quiz-toolbar.component.scss']
})
export class HostPlayingQuizToolbarComponent {
  @Input() title: string;
  @Output() quitQuiz = new EventEmitter();
}

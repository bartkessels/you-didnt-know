import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-player-toolbar',
  templateUrl: './player-toolbar.component.html',
  styleUrls: ['./player-toolbar.component.scss']
})
export class PlayerToolbarComponent {
  @Input() displaySignOutButton: boolean;
  @Output() signOut = new EventEmitter();
 }

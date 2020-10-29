import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Player } from 'src/app/models/player.model';
import { PlayerService } from 'src/app/service/player.service';

@Component({
  selector: 'app-register-player',
  templateUrl: './register-player.component.html',
  styleUrls: ['./register-player.component.scss']
})
export class RegisterPlayerComponent {
  public name: string;

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) { }

  public joinButtonPressed(): void {
    const newPlayer: Player = {
      id: Date.now().toString(),
      name: this.name
    };

    this.playerService.insertOrUpdatePlayer(newPlayer);
    this.router.navigateByUrl('/player/participate');
  }

  // should insert new player with the entered player name
  // should navigate to the participate page
}

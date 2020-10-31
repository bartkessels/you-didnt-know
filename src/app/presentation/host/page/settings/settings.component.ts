import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PlayGameService } from 'src/app/service/play-game.service';
import { PlayerService } from 'src/app/service/player.service';
import { FirestoreUtil } from 'src/app/utils/firestore.util';
import { SettingsUtil } from 'src/app/utils/settings.util';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public firebaseProjectId: string;
  public firebaseApiKey: string;

  constructor(
    private snackbar: MatSnackBar,
    private playGameService: PlayGameService,
    private playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.firebaseProjectId = SettingsUtil.getFirebaseProjectId();
    this.firebaseApiKey = SettingsUtil.getFirebaseApiKey();
  }

  public deleteAllPlayers(): void {
    this.playerService.deleteAllPlayers();
  }

  public clearCurrentPlayingSession(): void {
    this.playGameService.endQuiz();
  }

  public saveButtonClicked(): void {
    SettingsUtil.saveFirebaseProjectId(this.firebaseProjectId);
    SettingsUtil.saveFirebaseApiKey(this.firebaseApiKey);
    FirestoreUtil.initializeFirestore();

    this.openSnackBar();
  }

  private openSnackBar(): void {
    const durationInSeconds = 5000;

    this.snackbar.open('Your settings have been saved!', null, {
      duration: durationInSeconds
    });
  }

}

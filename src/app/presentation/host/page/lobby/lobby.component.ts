import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Player } from 'src/app/models/player.model';
import { Quiz } from 'src/app/models/quiz.model';
import { PlayerService } from 'src/app/service/player.service';
import { QuizService } from 'src/app/service/quiz.service';
import { SettingsUtil } from 'src/app/utils/settings.util';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss']
})
export class LobbyComponent implements OnInit {
  public quiz: Quiz;
  public joinUri: string;
  public players: Observable<Player[]>;

  constructor(
    private quizService: QuizService,
    private playerService: PlayerService,
    private route: ActivatedRoute
  ) {
    this.players = this.playerService.getAllPlayers();
  }

  ngOnInit(): void {
    this.route.params.subscribe(parameter => {
      const quizId = parameter.quizId;
      this.quizService.getQuiz(quizId).subscribe(quiz => {
        this.quiz = quiz;
      });
    });

    const firebaseProjectId = SettingsUtil.getFirebaseProjectId();
    const firebaseApiKey = SettingsUtil.getFirebaseApiKey();

    this.joinUri = `https://ydk.bartkessels.net/player/join/${firebaseProjectId}/${firebaseApiKey}`;
  }

  public deletePlayerButtonClicked(player: Player): void {
    this.playerService.deletePlayer(player);
  }
}

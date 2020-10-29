import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateQuizComponent } from './presentation/host/page/create-quiz/create-quiz.component';
import { DashboardComponent } from './presentation/host/page/dashboard/dashboard.component';
import { DeleteQuizComponent } from './presentation/host/page/delete-quiz/delete-quiz.component';
import { LobbyComponent } from './presentation/host/page/lobby/lobby.component';
import { PlayQuizComponent } from './presentation/host/page/play-quiz/play-quiz.component';
import { SettingsComponent } from './presentation/host/page/settings/settings.component';
import { UpdateQuizComponent } from './presentation/host/page/update-quiz/update-quiz.component';
import { JoinComponent } from './presentation/player/page/join/join.component';
import { ParticipateComponent } from './presentation/player/page/participate/participate.component';
import { RegisterPlayerComponent } from './presentation/player/page/register-player/register-player.component';
import { LandingComponent } from './presentation/shared/landing/landing.component';

const routes: Routes = [
  // Host routes
  { path: 'host/settings', component: SettingsComponent },
  { path: 'host/dashboard', component: DashboardComponent },
  { path: 'host/create-quiz', component: CreateQuizComponent },
  { path: 'host/update-quiz/:quizId', component: UpdateQuizComponent },
  { path: 'host/delete-quiz/:quizId', component: DeleteQuizComponent },
  { path: 'host/lobby/:quizId', component: LobbyComponent },
  { path: 'host/play-quiz/:quizId', component: PlayQuizComponent },

  // Player routes
  { path: 'player/join/:firebaseProjectId/:firebaseApiKey', component: JoinComponent },
  { path: 'player/register', component: RegisterPlayerComponent },
  { path: 'player/participate', component: ParticipateComponent },

  // General route
  { path: '**', component: LandingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

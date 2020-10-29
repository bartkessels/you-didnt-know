import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeneralToolbarComponent } from './presentation/host/layout/general-toolbar/general-toolbar.component';
import { DashboardComponent } from './presentation/host/page/dashboard/dashboard.component';

import { MatCommonModule  } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { QuizListItemCardComponent } from './presentation/host/component/quiz-list-item-card/quiz-list-item-card.component';
import { DeleteQuizComponent } from './presentation/host/page/delete-quiz/delete-quiz.component';
import { SettingsComponent } from './presentation/host/page/settings/settings.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { CreateQuizComponent } from './presentation/host/page/create-quiz/create-quiz.component';
import { ManageQuizComponent } from './presentation/host/component/manage-quiz/manage-quiz.component';
import { ManageQuestionComponent } from './presentation/host/component/manage-question/manage-question.component';
import { FormsModule } from '@angular/forms';
import { FirestoreUtil } from './utils/firestore.util';
import { ManageAssignmentComponent } from './presentation/host/component/manage-assignment/manage-assignment.component';
import { UpdateQuizComponent } from './presentation/host/page/update-quiz/update-quiz.component';
import { LobbyComponent } from './presentation/host/page/lobby/lobby.component';
import { QRCodeModule } from 'angularx-qrcode';
import { JoinComponent } from './presentation/player/page/join/join.component';
import { RegisterPlayerComponent } from './presentation/player/page/register-player/register-player.component';
import { PlayerToolbarComponent } from './presentation/shared/player-toolbar/player-toolbar.component';
import { DisplayQuestionComponent } from './presentation/host/component/display-question/display-question.component';
import { DisplayResultsComponent } from './presentation/host/component/display-results/display-results.component';
import { DisplayAssignmentComponent } from './presentation/host/component/display-assignment/display-assignment.component';
import { PlayQuizComponent } from './presentation/host/page/play-quiz/play-quiz.component';
import { HostPlayingQuizToolbarComponent } from './presentation/shared/host-playing-quiz-toolbar/host-playing-quiz-toolbar.component';
import { QuizOutroComponent } from './presentation/host/component/quiz-outro/quiz-outro.component';

@NgModule({
  declarations: [
    AppComponent,
    GeneralToolbarComponent,
    DashboardComponent,
    QuizListItemCardComponent,
    DeleteQuizComponent,
    SettingsComponent,
    CreateQuizComponent,
    ManageQuizComponent,
    ManageQuestionComponent,
    ManageAssignmentComponent,
    UpdateQuizComponent,
    LobbyComponent,
    JoinComponent,
    RegisterPlayerComponent,
    PlayerToolbarComponent,
    DisplayQuestionComponent,
    DisplayResultsComponent,
    DisplayAssignmentComponent,
    PlayQuizComponent,
    HostPlayingQuizToolbarComponent,
    QuizOutroComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FirestoreUtil.initializeFirestore(),
    QRCodeModule,
    FormsModule,
    MatCommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatExpansionModule,
    MatChipsModule,
    MatGridListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

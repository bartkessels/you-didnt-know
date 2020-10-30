import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreUtil } from 'src/app/utils/firestore.util';
import { SettingsUtil } from 'src/app/utils/settings.util';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (SettingsUtil.deviceCanAccessFirebase()) {
      this.router.navigateByUrl('/player/register');
      return;
    }

    this.route.params.subscribe(parameter => {
      const firebaseProjectId = parameter.firebaseProjectId;
      const firebaseApiKey = parameter.firebaseApiKey;

      SettingsUtil.saveFirebaseProjectId(firebaseProjectId);
      SettingsUtil.saveFirebaseApiKey(firebaseApiKey);

      window.location.reload();
    });
  }

  // should set the firebase projectId thats given through the route params
  // should set the firebase apiKey thats given through the route params
  // should initailizeFirestore
  // should navigate to the register screen
}

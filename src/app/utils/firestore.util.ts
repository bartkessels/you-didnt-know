import { ModuleWithProviders } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { SettingsUtil } from './settings.util';

export class FirestoreUtil {
  public static initializeFirestore(): ModuleWithProviders<AngularFireModule> {
    return AngularFireModule.initializeApp({
      apiKey: SettingsUtil.getFirebaseApiKey(),
      projectId: SettingsUtil.getFirebaseProjectId()
    });
  }
}

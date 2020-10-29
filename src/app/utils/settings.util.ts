export class SettingsUtil {
  private static firebaseProjectIdKey = 'fb_projectId';
  private static firebaseApipKey = 'fb_apiKey';

  public static deviceCanAccessFirebase(): boolean {
    const firebaseProjectId = this.getFirebaseProjectId();
    const firebaseApiKey = this.getFirebaseApiKey();

    return (firebaseProjectId.length > 0 && firebaseApiKey.length > 0);
  }

  public static saveFirebaseProjectId(projectId: string): void {
    localStorage.setItem(this.firebaseProjectIdKey, projectId);
  }

  public static saveFirebaseApiKey(apiKey: string): void {
    localStorage.setItem(this.firebaseApipKey, apiKey);
  }

  public static getFirebaseProjectId(): string {
    return localStorage.getItem(this.firebaseProjectIdKey) ?? '';
  }

  public static getFirebaseApiKey(): string {
    return localStorage.getItem(this.firebaseApipKey) ?? '';
  }

  public static clear(): void {
    localStorage.clear();
  }
}

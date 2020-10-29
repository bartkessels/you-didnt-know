import { SettingsUtil } from './settings.util';

describe('SettingsUtil', () => {
  it('should return an empty string when firebaseProjectId isnt set in the localstorage', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue(undefined);

    // Act
    const result = SettingsUtil.getFirebaseProjectId();

    // Assert
    expect(result).toEqual('');
  });

  it('should return an empty string when firebaseProjectId is null in localstorage', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue(null);

    // Act
    const result = SettingsUtil.getFirebaseProjectId();

    // Assert
    expect(result).toEqual('');
  });

  it('should return an the value of the localstorage when firebaseProjectId is set in localstorage', () => {
    // Arrange
    const expectedFirebaseProjectId = 'my-proj';

    spyOn(localStorage, 'getItem').and.returnValue(expectedFirebaseProjectId);

    // Act
    const result = SettingsUtil.getFirebaseProjectId();

    // Assert
    expect(result).toEqual(expectedFirebaseProjectId);
  });

  it('should return an empty string when firebaseApiKey isnt set in the localstorage', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue(undefined);

    // Act
    const result = SettingsUtil.getFirebaseApiKey();

    // Assert
    expect(result).toEqual('');
  });

  it('should return an empty string when firebaseApiKey is null in localstorage', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue(null);

    // Act
    const result = SettingsUtil.getFirebaseApiKey();

    // Assert
    expect(result).toEqual('');
  });

  it('should return an the value of the localstorage when firebaseApiKey is set in localstorage', () => {
    // Arrange
    const expectedFirebaseApiKey = 'secret-api-key';

    spyOn(localStorage, 'getItem').and.returnValue(expectedFirebaseApiKey);

    // Act
    const result = SettingsUtil.getFirebaseApiKey();

    // Assert
    expect(result).toEqual(expectedFirebaseApiKey);
  });

  it('should store the firebaseProjectId in the localstorage', () => {
    // Arrange
    const expectedFirebaseProjectId = 'my-proj';

    spyOn(localStorage, 'setItem');

    // Act
    SettingsUtil.saveFirebaseProjectId(expectedFirebaseProjectId);

    // Assert
    expect(localStorage.setItem).toHaveBeenCalledWith('fb_projectId', expectedFirebaseProjectId);
  });

  it('should store the firebaseApiKey in the localstorage', () => {
    // Arrange
    const expectedFirebaseApiKey = 'secret-api-key';

    spyOn(localStorage, 'setItem');

    // Act
    SettingsUtil.saveFirebaseApiKey(expectedFirebaseApiKey);

    // Assert
    expect(localStorage.setItem).toHaveBeenCalledWith('fb_apiKey', expectedFirebaseApiKey);
  });

  it('should return true for deviceCanAccessFirebase when projectId and apiKey are set', () => {
    // Arrange
    spyOn(localStorage, 'getItem').and.returnValue('data');

    // Act
    const result = SettingsUtil.deviceCanAccessFirebase();

    // Assert
    expect(result).toBeTrue();
  });

  it('should return false for deviceCanAccessFirebase when projectId is set and apiKey isnt set', () => {
    // Arrange
    spyOn(localStorage, 'getItem')
      .withArgs('fb_projectId').and.returnValue('data')
      .withArgs('fb_apiKey').and.returnValue(undefined);

    // Act
    const result = SettingsUtil.deviceCanAccessFirebase();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return false for deviceCanAccessFirebase when projectId is not set and apiKey is set', () => {
    // Arrange
    spyOn(localStorage, 'getItem')
      .withArgs('fb_projectId').and.returnValue(undefined)
      .withArgs('fb_apiKey').and.returnValue('data');

    // Act
    const result = SettingsUtil.deviceCanAccessFirebase();

    // Assert
    expect(result).toBeFalse();
  });

  it('should return false for deviceCanAccessFirebase when projectId and apiKey arent set', () => {
    // Arrange
    spyOn(localStorage, 'getItem')
      .withArgs('fb_projectId').and.returnValue(undefined)
      .withArgs('fb_apiKey').and.returnValue(undefined);

    // Act
    const result = SettingsUtil.deviceCanAccessFirebase();

    // Assert
    expect(result).toBeFalse();
  });
});

const DATA_REHYDRATION_KEY = 'algoria_user';

export class User {
  isOnboardingCompleted = false;
  lastCompletedQuestId = '';
  language = 'en';

  constructor(data?: User) {
    Object.assign(this, {...data});
  }

  static persistUserData(data: User): void {
    let jsonString: string;

    try {
      jsonString = JSON.stringify(data);
    } catch (e) {
      console.error('Failed to stringify user data', e);

      return;
    }

    localStorage.setItem(DATA_REHYDRATION_KEY, jsonString)
  }

  static rehydrateUserData(): User {
    const jsonString = localStorage.getItem(DATA_REHYDRATION_KEY) || '{}';
    let data: User | undefined = undefined;

    try {
      data = JSON.parse(jsonString);
    } catch (e) {
      console.error('Failed to parse user data', e);
    }

    return new User(data);
  }
}

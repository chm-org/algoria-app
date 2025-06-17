import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { STORAGE_STRATEGY } from '../consts/storage.token';
import { StorageStrategy } from '../interfaces/storage-strategy.interface';
import { User } from '../interfaces/user.interface';

const KEY = 'user';

const defaultUser: Readonly<User> = {
  isOnboardingCompleted: false,
  completedChallenges: [],
  language: 'en'
};

@Injectable({ providedIn: 'root' })
export class UserRepository {

  private storage = inject<StorageStrategy>(STORAGE_STRATEGY);

  /* cached in memory – exposes observable for reactive UI binding */
  private _user: WritableSignal<User> = signal(defaultUser);
  readonly user = this._user.asReadonly();

  async save(user: User): Promise<void> {
    await this.storage.write(KEY, user);
    this._user.set(user);
  }

  /** read fresh value from persistence (see provideAppInitializer in app.config.ts) */
  async pull(): Promise<void> {
    const stored = await this.storage.read<User>(KEY);
    this._user.set(stored ?? defaultUser);
  }

  /** convenience helpers */
  completeOnboarding(): Promise<void> {
    return this.save({ ...this.user(), isOnboardingCompleted: true });
  }

  setLanguage(lang: string): Promise<void> {
    return this.save({ ...this.user(), language: lang });
  }

  completeChallenge(id: string): Promise<void> {
    const completedChallenges = [...this.user().completedChallenges, id];
    return this.save({ ...this.user(), completedChallenges });
  }
}

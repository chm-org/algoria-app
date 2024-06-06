import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { User } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: WritableSignal<User | undefined> = signal(undefined);

  setUser(data: User): void {
    this.user.set(data);
  }

  getUser(): Signal<User | undefined> {
    return this.user.asReadonly();
  }

  updateUserData(data: Partial<User>): void {
    this.user.update(user => new User({...user, ...data} as User));
    User.persistUserData(this.user()!);
  }

  pruneUserData(): void {
    this.updateUserData(new User());
  }
}

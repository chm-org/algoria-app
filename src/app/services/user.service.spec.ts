import { TestBed } from '@angular/core/testing';
import { User } from "../models/user";

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set user', () => {
    const user: User = {isOnboardingCompleted: true, lastCompletedQuestId: '1234', language: 'en'};

    service.setUser(user);
    const userData = service.getUser();

    expect(userData()).toEqual(user);
  });

  it('should update user data', () => {
    const user: User = {isOnboardingCompleted: true, lastCompletedQuestId: '1234', language: 'en'};

    service.setUser(user);
    service.updateUserData({language: 'fr'});
    const userData = service.getUser();

    expect(userData()?.language).toEqual('fr');
  });

  it('should prune user data', () => {
    const user: User = {isOnboardingCompleted: true, lastCompletedQuestId: '1234', language: 'fr'};

    service.setUser(user);
    service.pruneUserData();
    const userData = service.getUser();

    expect(userData()?.language).toEqual('en');
  });
});

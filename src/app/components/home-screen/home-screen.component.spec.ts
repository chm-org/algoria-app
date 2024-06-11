import { signal } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockProvider } from "ng-mocks";
import { User } from "../../models/user";
import { UserService } from "../../services/user.service";
import { TRANSLATE_SERVICE_STUB } from "../../utils/mocks";

import { HomeScreenComponent } from './home-screen.component';

const MOCK_USER: User = new User({lastCompletedQuestId: '1.1', language: 'en', isOnboardingCompleted: false})

describe('HomeScreenComponent', () => {
  let component: HomeScreenComponent;
  let fixture: ComponentFixture<HomeScreenComponent>;
  let userService: UserService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeScreenComponent],
      providers: [
        MockProvider(UserService, {getUser: () => signal(MOCK_USER), updateUserData: () => undefined}, 'useValue'),
        TRANSLATE_SERVICE_STUB
      ]
    })
      .compileComponents();

    userService = TestBed.inject(UserService);
    fixture = TestBed.createComponent(HomeScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user data when onboarding completed', () => {
    const spy = spyOn(userService, 'updateUserData');

    component.onCompletedOnboarding();

    expect(spy).toHaveBeenCalled();
  });

  it('should update user data when quest completed', () => {
    const spy = spyOn(userService, 'updateUserData');
    const mockId = '1.2';

    component.onQuestCompleted({id: mockId});

    expect(spy).toHaveBeenCalledOnceWith({lastCompletedQuestId: mockId});
  });
});

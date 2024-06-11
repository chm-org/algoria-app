import { signal } from "@angular/core";
import { TestBed } from '@angular/core/testing';
import { TranslateService } from "@ngx-translate/core";
import { AppComponent } from './app.component';
import { User } from "./models/user";
import { UserService } from "./services/user.service";

describe('AppComponent', () => {
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let translateServiceSpy: jasmine.SpyObj<TranslateService>;
  let mockUser: User;

  beforeEach(async () => {
    mockUser = new User({isOnboardingCompleted: false, language: "fr", lastCompletedQuestId: ""});

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        {
          provide: UserService,
          useValue: jasmine.createSpyObj('UserService', {
            setUser: undefined,
            getUser: signal(mockUser)
          })
        },
        {provide: TranslateService, useValue: jasmine.createSpyObj('TranslateService', ['use'])},
      ]
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    translateServiceSpy = TestBed.inject(TranslateService) as jasmine.SpyObj<TranslateService>;
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should rehydrate and set user data', () => {
    spyOn(User, 'rehydrateUserData').and.returnValue(mockUser);

    TestBed.createComponent(AppComponent);

    expect(userServiceSpy.setUser).toHaveBeenCalledWith(mockUser);
  });

  it('should set app language according to user preferences', () => {
    TestBed.createComponent(AppComponent);

    expect(translateServiceSpy.use).toHaveBeenCalledWith(mockUser.language);
  });
});

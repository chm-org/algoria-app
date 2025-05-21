import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "../../services/user.service";
import { OnboardingComponent } from "../onboarding/onboarding.component";

@Component({
  selector: 'app-home-screen',
  imports: [OnboardingComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent {
  currentUser = this.userService.getUser();

  constructor(
    private router: Router,
    private userService: UserService,
    private translateService: TranslateService,
  ) {}

  onCompletedOnboarding() {
    this.userService.updateUserData({
      isOnboardingCompleted: true,
      language: this.translateService.currentLang
    });
    this.router.navigate(['world']);
  }
}

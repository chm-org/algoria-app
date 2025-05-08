import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Button } from 'primeng/button';
import { UserService } from "../../services/user.service";
import { OnboardingComponent } from "../onboarding/onboarding.component";

@Component({
    selector: 'app-home-screen',
  imports: [OnboardingComponent, RouterLink, Button],
    templateUrl: './home-screen.component.html',
    styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent {
  currentUser = this.userService.getUser();

  constructor(
    private userService: UserService,
    private translateService: TranslateService,
  ) {}

  onCompletedOnboarding() {
    this.userService.updateUserData({
      isOnboardingCompleted: true,
      language: this.translateService.currentLang
    });
  }
}

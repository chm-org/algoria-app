import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UserRepository } from '../../services/user.repository';
import { OnboardingComponent } from "../onboarding/onboarding.component";

@Component({
  selector: 'app-home-screen',
  imports: [OnboardingComponent],
  templateUrl: './home-screen.component.html',
  styleUrl: './home-screen.component.scss'
})
export class HomeScreenComponent {
  constructor(
    private router: Router,
    private userRepo: UserRepository,
    private translateService: TranslateService,
  ) {}

  onCompletedOnboarding() {
    this.userRepo.setLanguage(this.translateService.currentLang)
      .then(() => this.userRepo.completeOnboarding())
      .then(() => this.router.navigate(['world']));
  }
}

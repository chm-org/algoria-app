import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { UserService } from "../../services/user.service";
import { OnboardingComponent } from "../onboarding/onboarding.component";
import { CodeEditorComponent } from "../quest-window/code-editor/code-editor.component";
import { QuestWindowComponent } from "../quest-window/quest-window.component";
import { TaskDisplayComponent } from "../quest-window/task-display/task-display.component";

@Component({
  selector: 'app-home-screen',
  standalone: true,
  imports: [TaskDisplayComponent, CodeEditorComponent, OnboardingComponent, QuestWindowComponent, RouterOutlet],
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

  onQuestCompleted({id}: {id: string}) {
    this.userService.updateUserData({lastCompletedQuestId: id});
  }
}

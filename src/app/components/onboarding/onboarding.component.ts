import { NgTemplateOutlet } from "@angular/common";
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ONBOARDING, PREFACE } from "../../consts/onboarding";
import { BaseDialogComponent } from "../base-dialog/base-dialog.component";


@Component({
    selector: 'app-onboarding',
    imports: [
        BaseDialogComponent,
        TranslateModule,
        NgTemplateOutlet,
        FormsModule,
    ],
    templateUrl: './onboarding.component.html',
    styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent {
  @Output() completed = new EventEmitter<void>();
  preface = PREFACE;
  isPrefaceCompleted = false;
  steps = ONBOARDING;
  activeStepIndex = 0;
  activeStep = this.steps[this.activeStepIndex];
  language = 'en';

  constructor(
    private translateService: TranslateService
  ) {
  }

  onCompletePreface(): void {
    this.isPrefaceCompleted = true;
  }

  onPaging(pageProgress: number) {
    this.activeStepIndex = this.activeStepIndex + pageProgress;
    this.activeStep = this.steps[this.activeStepIndex];

    if (this.activeStepIndex >= this.steps.length) {
      this.completed.emit()
    }
  }

  onLanguageChanges(event: Event): void {
    this.language = (event.target as HTMLSelectElement).value;
    this.translateService.use(this.language);
  }
}

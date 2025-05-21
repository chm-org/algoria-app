import { Component, EventEmitter, Input, Output, signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CodeSubmission, CodeWritingChallenge, Expectations, Language } from 'algoria-utils';
import { Button } from 'primeng/button';
import { AlgorithmResultComponent } from '../../quest-window/algorithm-result/algorithm-result.component';
import { CodeEditorComponent } from '../../quest-window/code-editor/code-editor.component';
import { TaskDisplayComponent } from '../../quest-window/task-display/task-display.component';


@Component({
  selector: 'app-code-writing-challenge',
  imports: [
    CodeEditorComponent,
    TaskDisplayComponent,
    TranslateModule,
    Button,
    AlgorithmResultComponent
  ],
  templateUrl: './code-writing-challenge.component.html',
  styleUrl: './code-writing-challenge.component.scss'
})
export class CodeWritingChallengeComponent {
  @Input({required: true}) challenge!: CodeWritingChallenge;
  @Input() expectations: Expectations | undefined;
  @Output() questCompleted = new EventEmitter<{ id: string }>();

  isIntroductionCompleted = false;
  executionInProgress = signal(false);
  submission: WritableSignal<CodeSubmission | undefined> = signal(undefined);
  readonly congratulationText = 'You\'ve nailed it!'; // TODO: make a part of the challenge (strory)

  onIntroCompleted(): void {
    this.isIntroductionCompleted = true;
  }

  onExecutionCompleted() {
    this.executionInProgress.set(false);
  }

  onChallengeCompleted() {
    this.isIntroductionCompleted = false;
    this.questCompleted.emit({id: this.challenge.id});
  }

  onExecuteCode(code: string) {
    this.executionInProgress.set(true);
    this.submission.set({
      code,
      userId: "user1", // TODO: set unique user id
      problemId: this.challenge.id,
      language: Language.JavaScript, // TODO: bind language to a selector
      timestamp: new Date(),
    });
  }
}

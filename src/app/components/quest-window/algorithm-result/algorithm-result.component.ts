import { Inject, OnChanges, SimpleChanges, WritableSignal } from '@angular/core';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IsolatedRunner } from 'algoria-runner';
import {
  CodeSubmission,
  CodeWritingExpectations,
  type LoggerFactory,
  TestResult
} from 'algoria-utils';
import { FEEDBACK_PAGE_URL } from "../../../consts/common";
import { LOGGER_FACTORY } from '../../../consts/logger-factory.token';

@Component({
  selector: 'app-algorithm-result',
  imports: [
    TranslateModule
  ],
  templateUrl: './algorithm-result.component.html',
  styleUrl: './algorithm-result.component.scss'
})
export class AlgorithmResultComponent implements OnChanges {
  @Input({required: true}) congratulationText!: string;
  @Input() submission: CodeSubmission | undefined;
  @Input() expectations: CodeWritingExpectations | undefined;
  @Output() executionCompleted = new EventEmitter<void>();
  @Output() challengeCompleted = new EventEmitter<void>();

  readonly feedbackPageUrl = FEEDBACK_PAGE_URL;
  result: WritableSignal<TestResult> = signal({details: [], passed: false})
  runner: IsolatedRunner;

  constructor(
    @Inject(LOGGER_FACTORY) private loggerF: LoggerFactory
  ) {
    this.runner = new IsolatedRunner(this.loggerF);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['submission']) {
      const submission = changes['submission'].currentValue
      if (!submission) return;

      this.execute(submission, this.expectations);
    }
  }

  async execute(submission: CodeSubmission, expectations: CodeWritingExpectations | undefined): Promise<void> {
    if (!expectations) {
      console.error('No expectations provided');

      return;
    }

    const result = await this.runner.runTests(submission, expectations.functions);
    this.result.set(result)
    this.executionCompleted.emit();
  }

  onChallengeCompleted() {
    if (!this.result().passed) {
      return
    }

    this.challengeCompleted.emit();
  }
}

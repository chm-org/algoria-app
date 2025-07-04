import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  signal,
  SimpleChanges,
  WritableSignal
} from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { IsolatedRunner } from 'algoria-runner';
import { CodeSubmission, CodeWritingExpectations, LoggerFactory, TestResult } from 'algoria-utils';
import { FEEDBACK_PAGE_URL } from "../../../consts/common";
import { LOGGER_FACTORY } from '../../../consts/logger-factory.token';

type Status = 'pending' | 'passed' | 'failed';


@Component({
  selector: 'app-algorithm-result',
  standalone: true,
  imports: [
    TranslateModule,
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

  actualResultInFailedTest: WritableSignal<string | null> = signal(null);
  readonly feedbackPageUrl = FEEDBACK_PAGE_URL;
  result: WritableSignal<TestResult> = signal({details: [], passed: false})
  status: WritableSignal<Status> = signal('pending');
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

    this.status.set('pending');
    const result = await this.runner.runTests(submission, expectations.functions);

    this.result.set(result);
    const nextStatus: Status = result.passed ? 'passed' : 'failed';
    const failedTestOutput = result.passed ? null : this.parseErrorMessage(result.details);

    this.status.set(nextStatus);
    this.actualResultInFailedTest.set(failedTestOutput);
    this.executionCompleted.emit();
  }

  onChallengeCompleted() {
    if (!this.result().passed) {
      return
    }

    this.challengeCompleted.emit();
  }

  // Temporary measure, follow the remastering branch for details
   private parseErrorMessage(details: string[]): string | null {
     const info = details[1];
     const actualResult = info.match(/got:\s*(.*?)\s*instead\./)?.[1];

     return actualResult || null;
   }
}

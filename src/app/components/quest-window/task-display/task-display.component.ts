import { Component, Input } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";

interface TaskDescription {
  description: string;
  hints: string[];
}

@Component({
    selector: 'app-task-display',
    imports: [
        TranslateModule,
    ],
    templateUrl: './task-display.component.html',
    styleUrl: './task-display.component.scss'
})
export class TaskDisplayComponent {
  @Input({required: true}) title!: string;
  @Input({required: true}) task!: TaskDescription;

  isHintRequested = false;

  showHint() {
    this.isHintRequested = true;
  }
}

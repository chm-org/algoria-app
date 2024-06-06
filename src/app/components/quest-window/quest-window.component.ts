import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Router } from "@angular/router";
import { TranslateModule } from "@ngx-translate/core";
import { QUESTS } from "../../consts/quests";
import { AlgorithmicQuest } from "../../interfaces/algorithmic-quest.interface";
import { BaseDialogComponent } from "../base-dialog/base-dialog.component";
import { AlgorithmResultComponent } from "./algorithm-result/algorithm-result.component";
import { CodeEditorComponent } from "./code-editor/code-editor.component";
import { TaskDisplayComponent } from "./task-display/task-display.component";

@Component({
  selector: 'app-quest-window',
  standalone: true,
  imports: [
    AlgorithmResultComponent,
    CodeEditorComponent,
    TaskDisplayComponent,
    BaseDialogComponent,
    TranslateModule
  ],
  templateUrl: './quest-window.component.html',
  styleUrl: './quest-window.component.scss'
})
export class QuestWindowComponent implements OnChanges {
  @Input({required: true}) lastCompletedQuestId: string | undefined;
  @Output() questCompleted = new EventEmitter<{ id: string }>();
  activeQuest: AlgorithmicQuest | undefined;
  isIntroductionCompleted = false;

  constructor(
    private router: Router,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lastCompletedQuestId']) {
      this.setQuest();
    }
  }

  private setQuest() {
    let index = 0;

    if (this.lastCompletedQuestId) {
      index = QUESTS.findIndex(item => item.id === this.lastCompletedQuestId) + 1;
    }

    const isGameFinished = index === QUESTS.length;
    if (isGameFinished) {
      this.router.navigate(['/congratulations']);

      return;
    }

    this.activeQuest = QUESTS[index];
  }

  onIntroCompleted(): void {
    this.isIntroductionCompleted = true;
  }

  onQuestCompleted(isCompleted: boolean) {
    if (!isCompleted) {
      return;
    }

    this.isIntroductionCompleted = false;
    this.questCompleted.emit({id: this.activeQuest!.id});
  }
}

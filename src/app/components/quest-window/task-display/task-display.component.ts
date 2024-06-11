import { NgTemplateOutlet } from "@angular/common";
import { Component, Input } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { AlgorithmicQuest } from "../../../interfaces/algorithmic-quest.interface";
import { TextItemComponent } from "../text-item/text-item.component";

@Component({
  selector: 'app-task-display',
  standalone: true,
  imports: [
    TranslateModule,
    NgTemplateOutlet,
    TextItemComponent,
  ],
  templateUrl: './task-display.component.html',
  styleUrl: './task-display.component.scss'
})
export class TaskDisplayComponent {
  @Input({required: true}) quest!: AlgorithmicQuest;
  isHintRequested = false;

  showHint() {
    this.isHintRequested = true;
  }
}

import { NgClass } from "@angular/common";
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-base-dialog',
  standalone: true,
  imports: [
    NgClass,
    TranslateModule
  ],
  templateUrl: './base-dialog.component.html',
  styleUrl: './base-dialog.component.scss'
})
export class BaseDialogComponent implements OnChanges {
  @Input() hasNext = false;
  @Input() hasPrevious = false;
  @Output() previous = new EventEmitter<void>();
  @Output() next = new EventEmitter<void>();

  hasAction = false;

  ngOnChanges(changes:SimpleChanges): void {
    if (changes['hasNext'] || changes['hasPrevious']) {
      this.hasAction = this.hasNext || this.hasPrevious;
    }
  }
}

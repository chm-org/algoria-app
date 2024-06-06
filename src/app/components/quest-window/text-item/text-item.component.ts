import { NgTemplateOutlet } from "@angular/common";
import { Component, Input } from '@angular/core';
import { TranslateModule } from "@ngx-translate/core";
import { TextItem, TextItemType } from "../../../interfaces/text-item.interface";

@Component({
  selector: 'app-text-item',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    TranslateModule
  ],
  templateUrl: './text-item.component.html',
  styleUrl: './text-item.component.scss'
})
export class TextItemComponent {
  @Input({required: true}) parameter!: TextItem;
  protected readonly TextItemType = TextItemType;
}

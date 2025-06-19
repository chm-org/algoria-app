import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Challenge, SkillTree } from 'algoria-utils';
import { PrimeTemplate } from 'primeng/api';
import { Carousel, CarouselPageEvent } from 'primeng/carousel';

@Component({
  selector: 'app-skills-p',
  imports: [
    Carousel,
    PrimeTemplate
  ],
  templateUrl: './skills-p.component.html',
  styleUrl: './skills-p.component.scss'
})
export class SkillsPComponent {
  @Input({ required: true }) trees: SkillTree[] = [];
  @Input({ required: true }) activeTreeIndex = 0;
  @Input({ required: true }) challenges: Challenge[] = [];

  @Output() activeTreeIndexChanges = new EventEmitter<{index: number}>();
  readonly numVisible = 1;
  readonly numScroll = 1;

  onPageChanges({page}: CarouselPageEvent): void {
    this.activeTreeIndexChanges.emit({index: page ?? 0});
  }
}

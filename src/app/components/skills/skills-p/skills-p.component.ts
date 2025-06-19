import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Challenge, SkillTree } from 'algoria-utils';
import { PrimeTemplate } from 'primeng/api';
import { Carousel, CarouselPageEvent } from 'primeng/carousel';
import { AppChallenge } from '../../../interfaces/app-challenge.interface';

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
  @Input({ required: true }) challenges: AppChallenge[] = [];
  @Output() activeTreeIndexChanges = new EventEmitter<{index: number}>();
  @Output() challengeSelected = new EventEmitter<{id: string}>();

  readonly numVisible = 1;
  readonly numScroll = 1;

  onPageChanges({page}: CarouselPageEvent): void {
    this.activeTreeIndexChanges.emit({index: page ?? 0});
  }

  onChallengeSelected(id: string) {
    this.challengeSelected.emit({id});
  }
}

import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Button } from 'primeng/button';
import { Popover } from 'primeng/popover';
import { AppChallenge } from '../../interfaces/app-challenge.interface';
import { StateService } from '../../services/state.service';
import { DependenciesPComponent } from './dependencies-p/dependencies-p.component';

@Component({
  selector: 'app-dependencies',
  imports: [
    Popover,
    Button,
    DependenciesPComponent
  ],
  templateUrl: './dependencies.component.html',
  styleUrl: './dependencies.component.scss'
})
export class DependenciesComponent implements OnChanges {
  @Input() ids: string[] = [];
  @Output() challengeSelected = new EventEmitter<string>();
  @Output() skillTreeSelected = new EventEmitter<string>();

  challenges: AppChallenge[] = [];

  constructor(
    private stateService: StateService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['ids']) {
      this.challenges = this.ids
        .map(id => this.stateService.getChallenge(id))
        .filter(c => !!c)
        .map(challenge => ({
          ...challenge,
          ...this.stateService.getChallengeMetaData(challenge.id),
          blocked: this.stateService.isBlockedChallenge(challenge, this.stateService.completedChallengesIds)
        }))
    }
  }

  onChallengeSelected(id: string) {
    this.challengeSelected.emit(id);
  }

  onSkillTreeSelected(skillTreeId: string, popover: Popover) {
    popover.hide();
    this.skillTreeSelected.emit(skillTreeId);
  }
}

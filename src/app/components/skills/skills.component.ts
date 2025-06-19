import { Component, computed, signal, Signal } from '@angular/core';
import { Router } from '@angular/router';
import { SkillTree } from 'algoria-utils';
import { AppChallenge } from '../../interfaces/app-challenge.interface';
import { StateService } from '../../services/state.service';
import { SkillsPComponent } from './skills-p/skills-p.component';

@Component({
  selector: 'app-skills',
  imports: [
    SkillsPComponent
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent {
  activeTreeIndex = signal(0);
  skillTrees: Signal<SkillTree[]> = this.stateService.skillTrees;
  challenges: Signal<AppChallenge[]> = computed(() => {
    const activeTree = this.skillTrees()[this.activeTreeIndex()]
    return this.stateService.getSkillsChallenges(activeTree.id)
      .map(challenge => ({
        ...challenge,
        blocked: this.stateService.isBlockedChallenge(challenge, this.stateService.completedChallengesIds)
      }))
  });

  constructor(
    private router: Router,
    private stateService: StateService,
  ) {
  }

  onActiveTreeIndexChanges({index}: { index: number }) {
    this.activeTreeIndex.set(index);
  }

  onChallengeSelected({id}: { id: string }) {
    this.router.navigate(['/world', 'challenge', id])
  }
}

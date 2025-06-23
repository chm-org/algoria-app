import { computed, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SkillTree } from 'algoria-utils';
import { AppChallenge } from '../interfaces/app-challenge.interface';
import { StateService } from './state.service';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private _activeTreeIndex = signal(0);
  readonly activeTreeIndex = this._activeTreeIndex.asReadonly();
  readonly skillTrees: Signal<SkillTree[]> = this.stateService.skillTrees;

  readonly challenges: Signal<AppChallenge[]> = computed(() => {
    const activeTree = this.skillTrees()[this._activeTreeIndex()];
    return this.stateService
      .getSkillsChallenges(activeTree.id)
      .map(challenge => ({
        ...challenge,
        blocked: this.stateService.isBlockedChallenge(
          challenge,
          this.stateService.completedChallengesIds
        )
      }));
  });

  constructor(
    private readonly stateService: StateService,
    private readonly router: Router
  ) {}

  setActiveTreeIndex(index: number): void {
    this._activeTreeIndex.set(index);
  }

  startChallenge(id: string): Promise<boolean> {
    return this.router.navigate(['/world', 'challenge', id]);
  }

  selectSkillTree(id: string): void {
    this.setActiveTreeIndex(this.skillTrees().findIndex(tree => tree.id === id));
  }
}

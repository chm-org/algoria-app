import { computed, Injectable, Signal, signal } from '@angular/core';
import { Router } from '@angular/router';
import { SkillTree } from 'algoria-utils';
import { AppChallenge } from '../interfaces/app-challenge.interface';
import { StateService } from './state.service';
import {UserRepository} from "./user.repository";

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  private _activeTreeIndex = signal(0);
  private _cheatSheetId = signal<string | null>(null);
  readonly activeTreeIndex = this._activeTreeIndex.asReadonly();
  readonly cheatSheetId = this._cheatSheetId.asReadonly();
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
    private readonly router: Router,
    private readonly userRepository: UserRepository,
  ) {}

  setActiveTreeIndex(index: number): void {
    this._activeTreeIndex.set(index);
  }

  startChallenge(id: string): Promise<boolean> {
    return this.router.navigate(['/world', 'challenge', id]);
  }

  setCheatSheet(challengeId: string): void {
    const isCompleted = this.isChallengeCompleted(challengeId);

    if (!isCompleted) return

    this._cheatSheetId.set(challengeId);
  }

  resetCheatSheet(): void {
    this._cheatSheetId.set(null);
  }

  selectSkillTree(id: string): void {
    this.setActiveTreeIndex(this.skillTrees().findIndex(tree => tree.id === id));
  }

  isChallengeCompleted(id: string): boolean {
    return this.userRepository.user().completedChallenges.includes(id)
  }
}

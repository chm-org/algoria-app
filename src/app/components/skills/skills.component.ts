import { Component, computed, signal, Signal } from '@angular/core';
import { Challenge, SkillTree } from 'algoria-utils';
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
  challenges: Signal<Challenge[]> = computed(() => {
    const activeTree = this.skillTrees()[this.activeTreeIndex()]
    return this.stateService.getSkillsChallenges(activeTree.id)
  });

  constructor(
    private stateService: StateService,
  ) {
  }

  onActiveTreeIndexChanges({index}: { index: number }) {
    this.activeTreeIndex.set(index);
  }
}

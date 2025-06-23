import { Component, OnDestroy, Signal } from '@angular/core';
import { SkillTree } from 'algoria-utils';
import { AppChallenge } from '../../interfaces/app-challenge.interface';
import { SkillsService } from '../../services/skills.service';
import { SkillsPComponent } from './skills-p/skills-p.component';

@Component({
  selector: 'app-skills',
  imports: [
    SkillsPComponent
  ],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss'
})
export class SkillsComponent implements OnDestroy {
  activeTreeIndex = this.skillsService.activeTreeIndex;
  skillTrees: Signal<SkillTree[]> = this.skillsService.skillTrees;
  challenges: Signal<AppChallenge[]> = this.skillsService.challenges;

  constructor(
    private skillsService: SkillsService,
  ) {
  }

  ngOnDestroy() {
    this.skillsService.setActiveTreeIndex(0);
  }

  onActiveTreeIndexChanges({index}: { index: number }) {
    this.skillsService.setActiveTreeIndex(index);
  }

  onChallengeSelected({id}: { id: string }) {
    this.skillsService.startChallenge(id);
  }
}

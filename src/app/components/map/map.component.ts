import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AppChallenge } from '../../interfaces/app-challenge.interface';
import { SidebarService } from '../../services/sidebar.service';
import { SkillsService } from '../../services/skills.service';
import { StateService } from '../../services/state.service';
import { DependenciesComponent } from '../dependencies/dependencies.component';
import { PageComponent } from '../layout/page/page.component';


@Component({
  selector: 'app-map',
  imports: [
    PageComponent,
    RouterLink,
    NgClass,
    DependenciesComponent,
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  challenges: AppChallenge[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private sidebarService: SidebarService,
    private skillsService: SkillsService,
  ) {
    this.challenges = this.stateService.getStoryChallenges()
      .map(challenge => ({
        ...challenge,
        blocked: this.stateService.isBlockedChallenge(challenge, stateService.completedChallengesIds)
      }))
  }

  onDependencyClicked(id: string): void {
    this.router.navigate(['challenge', id], {
      relativeTo: this.activatedRoute
    })
  }

  onSkillTreeSelected(skillTreeId: string) {
    this.skillsService.selectSkillTree(skillTreeId);
    this.sidebarService.showSkills();
  }
}

import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Challenge } from 'algoria-utils';
import { AppChallenge } from '../../interfaces/app-challenge.interface';
import { StateService } from '../../services/state.service';
import { UserRepository } from '../../services/user.repository';
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
}

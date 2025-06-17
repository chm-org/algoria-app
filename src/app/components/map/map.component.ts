import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Challenge } from 'algoria-utils';
import { StateService } from '../../services/state.service';
import { UserRepository } from '../../services/user.repository';
import { DependenciesComponent } from '../dependencies/dependencies.component';
import { PageComponent } from '../layout/page/page.component';

type MapChallenge = Challenge & { disabled: boolean }

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
  challenges: MapChallenge[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stateService: StateService,
    private userRepo: UserRepository,
  ) {
    const completedChallenges = this.userRepo.user().completedChallenges;
    this.challenges = this.stateService.getStoryChallenges()
      .map(challenge => ({
        ...challenge,
        disabled: challenge.dependencies?.length
          ? !challenge.dependencies.every(dep => completedChallenges.includes(dep))
          : false
      }) as MapChallenge)
  }

  onDependencyClicked(id: string): void {
    this.router.navigate(['challenge', id], {
      relativeTo: this.activatedRoute
    })
  }
}

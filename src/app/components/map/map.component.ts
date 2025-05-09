import { Component, Signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Challenge } from 'algoria-utils';
import { StateService } from '../../services/state.service';
import { PageComponent } from '../layout/page/page.component';

@Component({
  selector: 'app-map',
  imports: [
    PageComponent,
    RouterLink
  ],
  templateUrl: './map.component.html',
  styleUrl: './map.component.scss'
})
export class MapComponent {
  challenges: Challenge[];

  constructor(
    private stateService: StateService
  ) {
    this.challenges = this.stateService.getStoryChallenges()
  }
}

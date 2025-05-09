import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Challenge } from 'algoria-utils';
import { StateService } from '../../../services/state.service';
import { PageComponent } from '../../layout/page/page.component';

@Component({
  selector: 'app-challenge',
  imports: [
    PageComponent,
    JsonPipe
  ],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent {
  challenge: Challenge | undefined;

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute
  ) {
    const id = this.route.snapshot.params['id']
    this.challenge = this.stateService.getChallenge(id);
  }
}

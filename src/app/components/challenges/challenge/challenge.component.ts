import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  CodeWritingChallenge,
  CodeWritingExpectations,
  isCodeWritingChallenge,
  isCodeWritingExpectations
} from 'algoria-utils';
import { StateService } from '../../../services/state.service';
import { UserRepository } from '../../../services/user.repository';
import { PageComponent } from '../../layout/page/page.component';
import { CodeWritingChallengeComponent } from '../code-writing-challenge/code-writing-challenge.component';

@Component({
  selector: 'app-challenge',
  imports: [
    PageComponent,
    CodeWritingChallengeComponent
  ],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.scss'
})
export class ChallengeComponent {
  codeWritingChallenge: CodeWritingChallenge | undefined;
  expectations: CodeWritingExpectations | undefined;

  constructor(
    private stateService: StateService,
    private route: ActivatedRoute,
    private userRepo: UserRepository
  ) {
    const id = this.route.snapshot.params['id']
    const challenge = this.stateService.getChallenge(id);
    if (!challenge) {
      throw new Error(`Challenge ${id} not found`)
    }
    const expectations = this.stateService.getChallengeExpectations(id);
    this.codeWritingChallenge = isCodeWritingChallenge(challenge) ? challenge : undefined;
    this.expectations = isCodeWritingExpectations(expectations) ? expectations : undefined;
  }

  onQuestCompleted({id}: {id: string}) {
    this.userRepo.completeChallenge(id);
  }
}

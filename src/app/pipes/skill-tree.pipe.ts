import { Pipe, PipeTransform } from '@angular/core';
import { ChallengeIndex, SkillTree } from 'algoria-utils';
import { StateService } from '../services/state.service';

@Pipe({
  name: 'skillTree'
})
export class SkillTreePipe implements PipeTransform {

  constructor(
    private stateService: StateService
  ) { }

  transform(skillTreeId: ChallengeIndex['skillTreeId']): SkillTree | undefined {
    if (!skillTreeId) return;

    return this.stateService.getSkillTree(skillTreeId);
  }
}

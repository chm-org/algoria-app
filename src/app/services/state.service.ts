import { computed, Injectable, signal } from '@angular/core';
import { Challenge, ChallengeIndex, Expectations, SkillTree } from 'algoria-utils';

interface State {
  challenges: Challenge[];
  expectations: Expectations[];
  indexes: ChallengeIndex[];
  skillTrees: SkillTree[];
}

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = signal<State>({
    challenges: [],
    expectations: [],
    indexes: [],
    skillTrees: [],
  });

  challenges = computed(() => this.state().challenges);
  expectations = computed(() => this.state().expectations);
  indexes = computed(() => this.state().indexes);
  skillTrees = computed(() => this.state().skillTrees);

  constructor() { }

  setChallenges(challenges: Challenge[]) {
    this.state.set({...this.state(), challenges});
  }

  setExpectations(expectations: Expectations[]) {
    this.state.set({...this.state(), expectations});
  }

  setIndexes(indexes: ChallengeIndex[]) {
    this.state.set({...this.state(), indexes});
  }

  setSkillTrees(skillTrees: SkillTree[]) {
    this.state.set({...this.state(), skillTrees});
  }
}

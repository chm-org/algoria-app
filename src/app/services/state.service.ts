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
  private storyChallengesCache: Challenge[] = [];

  challenges = computed(() => this.state().challenges);
  expectations = computed(() => this.state().expectations);
  indexes = computed(() => this.state().indexes);
  skillTrees = computed(() => this.state().skillTrees);

  constructor() { }

  getChallenge(id: string): Challenge | undefined {
    return this.challenges().find(challenge => challenge.id === id);
  }

  getStoryIndex(): ChallengeIndex | undefined {
    return this.indexes().find(index => index.type === 'story');
  }

  getStoryChallenges(): Challenge[] {
    if (this.storyChallengesCache.length) {
      return this.storyChallengesCache;
    }

    const storyIndex = this.getStoryIndex();

    storyIndex
      ? this.storyChallengesCache = this.challenges().filter(challenge => storyIndex!.challenges.includes(challenge.id))
      : console.warn('Story index not found. Can not extract story challenges.');

    return this.storyChallengesCache;
  }

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

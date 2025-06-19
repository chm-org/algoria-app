import { computed, Injectable, signal } from '@angular/core';
import { Challenge, ChallengeIndex, Expectations, SkillTree } from 'algoria-utils';
import { UserRepository } from './user.repository';

interface State {
  challenges: Map<challengeId, Challenge>;
  expectations: Expectations[];
  indexes: ChallengeIndex[];
  skillTrees: SkillTree[];
}
type skillTreeId = string;
type challengeId = string;

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private state = signal<State>({
    challenges: new Map(),
    expectations: [],
    indexes: [],
    skillTrees: [],
  });
  private storyChallengesCache: Challenge[] = [];
  private skillsChallengesCache: Map<skillTreeId, Challenge[]> = new Map();

  completedChallengesIds = this.userRepo.user().completedChallenges;
  challenges = computed(() => this.state().challenges);
  expectations = computed(() => this.state().expectations);
  indexes = computed(() => this.state().indexes);
  skillTrees = computed(() => this.state().skillTrees);

  constructor(
    private userRepo: UserRepository,
  ) { }

  getChallenge(id: string): Challenge | undefined {
    return this.challenges().get(id);
  }

  isBlockedChallenge(challenge: Challenge, completedChallenges: string[]): boolean {
    return challenge.dependencies?.length
    ? !challenge.dependencies.every(dep => completedChallenges.includes(dep))
    : false
  }

  getChallengeExpectations(challengeId: string): Expectations | undefined {
    return this.expectations().find(expectation => expectation.challengeId === challengeId);
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
      ? this.storyChallengesCache = Array.from(this.challenges().values()).filter(challenge => storyIndex!.challenges.includes(challenge.id))
      : console.warn('Story index not found. Can not extract story challenges.');

    return this.storyChallengesCache;
  }

  getSkillsChallenges(treeId: string): Challenge[] {
    if (this.skillsChallengesCache.has(treeId)) {
      return this.skillsChallengesCache.get(treeId) as Challenge[];
    }

    const index = this.indexes().find(index => index.skillTreeId === treeId);
    index
      ? this.skillsChallengesCache.set(treeId, Array.from(this.challenges().values()).filter(challenge => index!.challenges.includes(challenge.id)))
      : console.warn('No index found. Cannot identify challenges belonging to the skill tree.');

    return this.skillsChallengesCache.get(treeId) || [];
  }

  setChallenges(challenges: Challenge[]) {
    this.state.set({...this.state(), challenges: new Map(challenges.map(challenge => [challenge.id, challenge]))});
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

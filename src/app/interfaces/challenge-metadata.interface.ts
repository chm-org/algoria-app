import { ChallengeIndex } from 'algoria-utils';

export interface ChallengeMetadata {
  indexId: string,
  indexType: ChallengeIndex['type'],
  skillTreeId: ChallengeIndex['skillTreeId']
}

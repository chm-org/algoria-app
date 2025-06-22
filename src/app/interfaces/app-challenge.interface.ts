import { Challenge } from 'algoria-utils';
import { ChallengeMetadata } from './challenge-metadata.interface';

export type AppChallenge = Challenge & { blocked: boolean } & Partial<ChallengeMetadata>;

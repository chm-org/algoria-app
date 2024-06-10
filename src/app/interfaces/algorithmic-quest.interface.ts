import { QuestDescription } from "./quest-description.interface";
import { QuestHint } from "./quest-hint.interface";

export interface AlgorithmicQuest extends BaseQuest{
  name: string;
  intro: string;
  description: QuestDescription;
  hint: QuestHint;
  congratulationText: string;
  uncompletedCode: string;
  missingCodeTemplate: string;
  expectedResult: any;
  match: (actualResult: any) => boolean
  coverImageUrl?: string;
}

export interface BaseQuest {
  level: number;
  quest: number;
  id: string;
}

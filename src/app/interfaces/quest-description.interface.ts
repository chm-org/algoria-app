import { TextItem } from "./text-item.interface";

export interface QuestDescription {
  intro: string;
  parameters: TextItem[];
  expectedResult: TextItem[];
}

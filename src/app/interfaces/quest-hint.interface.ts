import { TextItem } from "./text-item.interface";

export interface QuestHint {
  description: TextItem[];
  peculiarities?: TextItem[];
  pseudocode: TextItem[];
}

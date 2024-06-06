import { BaseQuest } from "../interfaces/algorithmic-quest.interface";
import { generateQuestId } from "../utils";

export class Quest implements BaseQuest {
  level: number;
  quest: number;
  id: string;

  constructor(level: number, quest: number) {
    this.level = level;
    this.quest = quest;
    this.id = generateQuestId(this.level, this.quest);
  }
}

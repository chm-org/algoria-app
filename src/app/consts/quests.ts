import { ChronicleLibraryQuest } from "../models/chronicle-library-quest";
import { CityWallQuest } from "../models/city-wall-quest";
import { MazeOfKnowledgeQuest } from "../models/maze-of-knowledge-quest";

export const QUESTS = [
  new MazeOfKnowledgeQuest(1, 1),
  new ChronicleLibraryQuest(1, 2),
  new CityWallQuest(2, 1)
];

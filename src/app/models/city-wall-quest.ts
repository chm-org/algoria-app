import { AlgorithmicQuest } from "../interfaces/algorithmic-quest.interface";
import { QuestDescription } from "../interfaces/quest-description.interface";
import { QuestHint } from "../interfaces/quest-hint.interface";
import { TextItemType } from "../interfaces/text-item.interface";
import { Quest } from "./quest";

type Wall = 'North' | 'South' | 'East' | 'West';

interface WallsAndDefenders {
  wall: Wall;
  defenders: number;
}

const WALLS_STRING = `[
  {wall: "North", enemiesAmount: 9},
  {wall: "South", enemiesAmount: 11},
  {wall: "East", enemiesAmount: 16},
  {wall: "West", enemiesAmount: 2},
]
`
const DEFENDERS_STRING = `[
  {class: "Archer", strength: 1},
  {class: "Spearman", strength: 2},
  {class: "Knight", strength: 5},
  {class: "Mage", strength: 10},
]
`
const DISTRIBUTION_STRING = `[
  {wall: 'North', defenders: 3},
  {wall: 'South', defenders: 2},
  {wall: 'East', defenders: 3},
  {wall: 'West', defenders: 1}
]
`

export class CityWallQuest extends Quest implements AlgorithmicQuest {
  uncompletedCode = `
    const walls = [
      {wall: "North", enemiesAmount: 9},
      {wall: "South", enemiesAmount: 11},
      {wall: "East", enemiesAmount: 16},
      {wall: "West", enemiesAmount: 2},
    ];
    const defenders = [
      {class: "Archer", strength: 1},
      {class: "Spearman", strength: 2},
      {class: "Knight", strength: 5},
      {class: "Mage", strength: 10},
    ];

    distributeDefenders(walls, defenders);
  `;
  missingCodeTemplate = `
    function distributeDefenders(walls, defenders) {
        // call the minDefenders function for the each wall and return the distribution
    }

    function minDefenders(defenders, enemiesAmount) {
      // determine the minimum number of defenders required based on the number of enemies
    }
  `;
  expectedResult: WallsAndDefenders[] = [
    {wall: 'North', defenders: 3},
    {wall: 'South', defenders: 2},
    {wall: 'East', defenders: 3},
    {wall: 'West', defenders: 1}
  ];
  name = 'CITY_WALL.NAME';
  intro = 'CITY_WALL.INTRO';
  coverImageUrl = '../../assets/city_walls.png';
  congratulationText = 'CITY_WALL.CONGRATULATIONS';
  description: QuestDescription = {
    intro: 'CITY_WALL.DESCRIPTION.INTRO',
    parameters: [
      {
        type: TextItemType.Pre,
        title: 'CITY_WALL.DESCRIPTION.PARAMETERS.PARAMETER1_TITLE',
        body: DEFENDERS_STRING
      },
      {
        type: TextItemType.Pre,
        title: 'CITY_WALL.DESCRIPTION.PARAMETERS.PARAMETER2_TITLE',
        body: WALLS_STRING
      }
    ],
    expectedResult: [
      {
        type: TextItemType.Pre,
        title: 'CITY_WALL.DESCRIPTION.EXPECTED_RESULT.RESULT1_TITLE',
        body: DISTRIBUTION_STRING
      }
    ]
  };
  hint: QuestHint = {
    description: [
      {type: TextItemType.Text, body: 'CITY_WALL.HINT.DESCRIPTION.ITEM1'},
      {type: TextItemType.Text, title: 'CITY_WALL.HINT.DESCRIPTION.ITEM2_TITLE', body: 'CITY_WALL.HINT.DESCRIPTION.ITEM2'},
      {type: TextItemType.Text, title: 'CITY_WALL.HINT.DESCRIPTION.ITEM3_TITLE', body: 'CITY_WALL.HINT.DESCRIPTION.ITEM3'},
      {type: TextItemType.Text, title: 'CITY_WALL.HINT.DESCRIPTION.ITEM4_TITLE', body: 'CITY_WALL.HINT.DESCRIPTION.ITEM4'}
    ],
    peculiarities: [
      {type: TextItemType.Text, body: 'CITY_WALL.HINT.PECULIARITIES.ITEM1'},
      {type: TextItemType.Text, body: 'CITY_WALL.HINT.PECULIARITIES.ITEM2'},
      {type: TextItemType.Text, body: 'CITY_WALL.HINT.PECULIARITIES.ITEM3'},
      {type: TextItemType.Text, body: 'CITY_WALL.HINT.PECULIARITIES.ITEM4'},
    ],
    pseudocode: [
      {
        type: TextItemType.Code,
        body: `
        +-------------------------------------------+
        |                  Start                    |
        +-------------------------------------------+
                             |
                             v
      +---------------------------------------------------+
      | Initialize dp array with size (enemiesAmount + 1) |
      | dp[0] = 0; all other elements = MAX_SAFE_INTEGER  |
      +---------------------------------------------------+
                             |
                             v
      +-----------------------------------------------+
      |       For each number of enemies from 1 to    |
      |        enemiesAmount                          |
      +-----------------------------------------------+
                             |
                             v
        +-------------------------------------------+
        |     For each defender in defenders list   |
        +-------------------------------------------+
                             |
                             v
    +----------------------------------------------------+
    |  If defender.strength <= current number of enemies |
    |  Then dp[enemies] = min(                           |
    |     dp[enemies],                                   |
    |     1 + dp[enemies - defender.strength]            |
    | )                                                  |
    +----------------------------------------------------+
                             |
                             v
        +-------------------------------------------+
        |                  End                      |
        +-------------------------------------------+
        `
      }
    ]
  }

  constructor(level: number, quest: number) {
    super(level, quest);
  }

  match = (actualResult: any) => {
    return Array.isArray(actualResult) &&
      actualResult.length === this.expectedResult.length &&
      actualResult.every(({wall, defenders}) => {
        const {
          wall: expectedWall,
          defenders: expectedDefenders
        } = this.expectedResult.find(item => item.wall === wall && item.defenders === defenders) || {};

        return wall === expectedWall && defenders === expectedDefenders;
      });
  }
}

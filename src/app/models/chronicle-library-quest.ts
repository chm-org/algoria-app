import { AlgorithmicQuest } from "../interfaces/algorithmic-quest.interface";
import { QuestDescription } from "../interfaces/quest-description.interface";
import { QuestHint } from "../interfaces/quest-hint.interface";
import { TextItemType } from "../interfaces/text-item.interface";
import { Quest } from "./quest";

export class ChronicleLibraryQuest extends Quest implements AlgorithmicQuest {
  uncompletedCode =  `
    const books = [
      {"title": "Book1", "year": 1999},
      {"title": "Book2", "year": 2001},
      {"title": "Book3", "year": 1995},
      {"title": "Book4", "year": 2010},
      {"title": "Book5", "year": 2005}
    ]

    quick_sort(books)
  `;
  missingCodeTemplate = `
    function quick_sort(books) {
      // write your code here
    }
  `;
  expectedResult = [
    {"title": "Book3", "year": 1995},
    {"title": "Book1", "year": 1999},
    {"title": "Book2", "year": 2001},
    {"title": "Book5", "year": 2005},
    {"title": "Book4", "year": 2010}
  ];
  name = 'CHRONICLE_LIBRARY.NAME';
  intro = 'CHRONICLE_LIBRARY.INTRO';
  congratulationText = 'CHRONICLE_LIBRARY.CONGRATULATIONS';
  description: QuestDescription = {
    intro: 'CHRONICLE_LIBRARY.DESCRIPTION.INTRO',
    parameters: [
      {
        type: TextItemType.Pre,
        title: 'CHRONICLE_LIBRARY.DESCRIPTION.PARAMETERS.PARAMETER1_TITLE',
        body: `
        [
          {"title": "Book1", "year": 1999},
          {"title": "Book2", "year": 2001},
          {"title": "Book3", "year": 1995},
          {"title": "Book4", "year": 2010},
          {"title": "Book5", "year": 2005}
        ]
        `
      }
    ],
    expectedResult: [
      {
        type: TextItemType.Pre,
        title: 'CHRONICLE_LIBRARY.DESCRIPTION.EXPECTED_RESULT.RESULT1_TITLE',
        body: `
        [
          {"title": "Book3", "year": 1995},
          {"title": "Book1", "year": 1999},
          {"title": "Book2", "year": 2001},
          {"title": "Book5", "year": 2005},
          {"title": "Book4", "year": 2010}
        ];
        `
      }
    ]
  };
  hint: QuestHint = {
    description: [
      {type: TextItemType.Text, body: 'CHRONICLE_LIBRARY.HINT.DESCRIPTION.ITEM1'}
    ],
    peculiarities: [
      { type: TextItemType.Text, body: 'CHRONICLE_LIBRARY.HINT.PECULIARITIES.ITEM1' },
      { type: TextItemType.Text, body: 'CHRONICLE_LIBRARY.HINT.PECULIARITIES.ITEM2' },
      { type: TextItemType.Text, body: 'CHRONICLE_LIBRARY.HINT.PECULIARITIES.ITEM3' },
      { type: TextItemType.Text, body: 'CHRONICLE_LIBRARY.HINT.PECULIARITIES.ITEM4' },
    ],
    pseudocode: [
      {
        type: TextItemType.Code,
        body: `
        +---------------------------------------+
        |                Start                  |
        +---------------------------------------+
                         |
                         v
        +---------------------------------------+
        |       Select pivot element            |
        +---------------------------------------+
                         |
                         v
        +---------------------------------------+
        |    Partition array into two parts:    |
        |  - Elements less than pivot           |
        |  - Elements greater than or equal to  |
        |    pivot                              |
        +---------------------------------------+
                         |
                         v
        +---------------------------------------+
        | Recursively sort each part            |
        +---------------------------------------+
                         |
                         v
        +---------------------------------------+
        |      Combine sorted parts             |
        +---------------------------------------+
                         |
                         v
        +---------------------------------------+
        |                End                    |
        +---------------------------------------+
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
      actualResult.every((value, index) => value.year === this.expectedResult[index]?.year);
  }
}

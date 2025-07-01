import { CodeWritingExpectations, type TestCase } from 'algoria-utils';
import { AlgorithmicQuest } from "../interfaces/algorithmic-quest.interface";
import { QuestDescription } from "../interfaces/quest-description.interface";
import { QuestHint } from "../interfaces/quest-hint.interface";
import { TextItemType } from "../interfaces/text-item.interface";
import { Quest } from "./quest";

export class MazeOfKnowledgeQuest extends Quest implements AlgorithmicQuest {
  uncompletedCode = `
    const graph = {
      'A': ['B', 'C'],
      'B': ['A', 'D', 'E'],
      'C': ['A', 'E'],
      'D': ['B', 'F'],
      'E': ['B', 'C', 'F'],
      'F': ['D', 'E']
      }

      const start = 'A';
      const goal = 'F';
      bfs(graph, start, goal);
  `;
  missingCodeTemplate = `
    function bfs(graph, start, goal) {
      // write your code here
    }
  `;
  expectedResult: CodeWritingExpectations = {
    type: 'codeWriting',
    challengeId: this.id,
    functions: [
      {
        functionName: 'bfs',
        testCases: [
          {
            input: [
              {
                'A': ['B', 'C'],
                'B': ['A', 'D', 'E'],
                'C': ['A', 'E'],
                'D': ['B', 'F'],
                'E': ['B', 'C', 'F'],
                'F': ['D', 'E']
              },
              'A',
              'F'
            ],
            expectedOutput: ['A', 'B', 'D', 'F'],
            matcherType: "deepEqual",
          }
        ]
      }
    ]
  };
  name = 'MAZE_OF_KNOWLEDGE.NAME';
  intro = 'MAZE_OF_KNOWLEDGE.INTRO';
  coverImageUrl = '../../assets/maze_of_knowledge.png';
  description: QuestDescription = {
    intro: 'MAZE_OF_KNOWLEDGE.DESCRIPTION.INTRO',
    parameters: [
      {type: TextItemType.Text, body: 'MAZE_OF_KNOWLEDGE.DESCRIPTION.PARAMETERS.PARAMETER1'},
      {type: TextItemType.Text, body: 'MAZE_OF_KNOWLEDGE.DESCRIPTION.PARAMETERS.PARAMETER2'},
      {
        type: TextItemType.Pre,
        title: 'MAZE_OF_KNOWLEDGE.DESCRIPTION.PARAMETERS.PARAMETER3_TITLE',
        body: `
          A - B - D
          |   |   |
          C - E - F
        `
      },
    ],
    expectedResult: [
      {type: TextItemType.Pre, body: `['A', 'B', 'D', 'F']`}
    ]
  };
  hint: QuestHint = {
    description: [
      {type: TextItemType.Text, body: 'MAZE_OF_KNOWLEDGE.HINT.DESCRIPTION.ITEM1'}
    ],
    peculiarities: [
      {type: TextItemType.Text, body: 'MAZE_OF_KNOWLEDGE.HINT.PECULIARITIES.ITEM1'},
      {
        type: TextItemType.Text,
        body: 'MAZE_OF_KNOWLEDGE.HINT.PECULIARITIES.ITEM2'
      }
    ],
    pseudocode: [
      {
        type: TextItemType.Code,
        body: `
        BFS(graph, start_node, goal):
          # Create an empty queue and add a start node
          queue = []
          queue.append(start_node)

          # Create a set to track visited nodes
          visited = Set()
          visited.add(start_node)

          # Create a helper object in which we will mark parental links between nodes
          parent = Map()

          current_node = None

          # As long as the line isn't empty
          while queue:
              # Retrieve the node from the beginning of the queue
              current_node = queue.pop(0)

              # If you come across the node you are looking for, abort the search
              if neighbor is goal:
                break

              # Go through all neighbors of the current node
              for neighbor in graph[current_node]:
                  if neighbor not in visited:
                      # If the neighbor has not been visited, add it to the queue and mark it as visited
                      queue.append(neighbor)
                      visited.add(neighbor)

                      # As part of our pathfinding task, we update the linkage map
                      parent.set(neighbor, current_node)

          # Once the search is complete, we traverse the linkage map to build the path
          path = []
          while current_node
            path.append(node)
            node = parent.get(node)

          # Returning the path in reverse order
          return path.reverse()
        `
      }
    ]

  };
  congratulationText = 'MAZE_OF_KNOWLEDGE.CONGRATULATIONS';

  constructor(level: number, quest: number) {
    super(level, quest);
  }
}

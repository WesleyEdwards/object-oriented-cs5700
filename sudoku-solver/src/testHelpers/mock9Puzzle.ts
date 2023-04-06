import { Puzzle } from "../solving_classes/SolverTemplate";

export const mock9Puzzle: Puzzle = {
  fileName: "9x9",
  possibleValues: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
  dimensions: 9,
  originalGrid: new Array(9).fill(0).map((_, indexRow) =>
    new Array(9).fill(0).map((_, indexCol) => ({
      assignedValue: undefined,
      possibleValues: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      row: indexRow,
      col: indexCol,
    }))
  ),
  workingGrid: new Array(9).fill(0).map((_, indexRow) =>
    new Array(9).fill(0).map((_, indexCol) => ({
      assignedValue: undefined,
      possibleValues: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      row: indexRow,
      col: indexCol,
    }))
  ),
};

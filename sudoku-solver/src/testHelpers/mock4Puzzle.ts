import { Puzzle, SudokuGrid } from "../solvers/SolverTemplate";

const possibleValues = ["1", "2", "3", "4"];

export const mock4Puzzle: Puzzle = {
  fileName: "4x4",
  possibleValues: ["1", "2", "3", "4"],
  dimensions: 4,
  originalGrid: [
    [
      { assignedValue: undefined, possibleValues: ["1"], row: 0, col: 0 },
      { assignedValue: undefined, possibleValues: ["2"], row: 0, col: 1 },
      { assignedValue: undefined, possibleValues: ["3"], row: 0, col: 2 },
      { assignedValue: undefined, possibleValues: ["4"], row: 0, col: 3 },
    ],
    [
      { assignedValue: undefined, possibleValues, row: 1, col: 0 },
      { assignedValue: undefined, possibleValues, row: 1, col: 1 },
      { assignedValue: undefined, possibleValues, row: 1, col: 2 },
      { assignedValue: undefined, possibleValues, row: 1, col: 3 },
    ],
    [
      { assignedValue: undefined, possibleValues, row: 2, col: 0 },
      { assignedValue: undefined, possibleValues, row: 2, col: 1 },
      { assignedValue: undefined, possibleValues, row: 2, col: 2 },
      { assignedValue: undefined, possibleValues, row: 2, col: 3 },
    ],
    [
      { assignedValue: undefined, possibleValues, row: 3, col: 0 },
      { assignedValue: undefined, possibleValues, row: 3, col: 1 },
      { assignedValue: undefined, possibleValues, row: 3, col: 2 },
      { assignedValue: undefined, possibleValues, row: 3, col: 3 },
    ],
  ],
  workingGrid: [
    [
      { assignedValue: undefined, possibleValues, row: 0, col: 0 },
      { assignedValue: undefined, possibleValues, row: 0, col: 1 },
      { assignedValue: undefined, possibleValues, row: 0, col: 2 },
      { assignedValue: undefined, possibleValues, row: 0, col: 3 },
    ],
    [
      { assignedValue: undefined, possibleValues, row: 1, col: 0 },
      { assignedValue: undefined, possibleValues, row: 1, col: 1 },
      { assignedValue: undefined, possibleValues, row: 1, col: 2 },
      { assignedValue: undefined, possibleValues, row: 1, col: 3 },
    ],
    [
      { assignedValue: undefined, possibleValues, row: 2, col: 0 },
      { assignedValue: undefined, possibleValues, row: 2, col: 1 },
      { assignedValue: undefined, possibleValues, row: 2, col: 2 },
      { assignedValue: undefined, possibleValues, row: 2, col: 3 },
    ],
    [
      { assignedValue: undefined, possibleValues, row: 3, col: 0 },
      { assignedValue: undefined, possibleValues, row: 3, col: 1 },
      { assignedValue: undefined, possibleValues, row: 3, col: 2 },
      { assignedValue: undefined, possibleValues, row: 3, col: 3 },
    ],
  ],
};

export const mock4Grid: SudokuGrid = (() => {
  const grid: SudokuGrid = [];
  for (let i = 0; i < 4; i++) {
    grid.push([]);
    for (let j = 0; j < 4; j++) {
      grid[i].push(mock4Puzzle.originalGrid[i][j]);
    }
  }
  return grid;
})();

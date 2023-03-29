import { Puzzle, SudokuGrid, SolverTemplate } from "./SolverTemplate";

export class Backtrack implements SolverTemplate {
  private initialPuzzle: Puzzle;
  private grid: SudokuGrid;
  constructor(puzzle: Puzzle) {
    this.initialPuzzle = puzzle;
    this.grid = puzzle.sudokuGrid;
  }

  solve() {
    if (!this.checkSolvable()) {
      return null;
    }
    return this.initialPuzzle;
  }

  solveSection() {
    return;
  }

  checkSolvable(): boolean {
    return this.grid.every((row) => {
      return row.every((cell) => {
        if (cell.assignedValue !== undefined) return true;
        if (cell.possibleValues.length === 0) return false;
        return true;
      });
    });
  }
}

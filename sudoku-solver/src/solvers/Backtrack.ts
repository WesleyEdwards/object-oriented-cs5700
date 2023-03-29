import { Puzzle, SudokuGrid, SolverTemplate } from "./SolverTemplate";

export class Backtrack implements SolverTemplate {
  private initialPuzzle: Puzzle;
  private grid: SudokuGrid;
  constructor(puzzle: Puzzle) {
    this.initialPuzzle = puzzle;
    this.grid = { ...puzzle.sudokuGrid };
  }

  solve() {
    return this.initialPuzzle;
  }

  solveSection() {
    return;
  }
}

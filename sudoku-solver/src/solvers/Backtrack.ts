import { Puzzle, SudokuGrid, SolverTemplate } from "./SolverTemplate";

export class Backtrack implements SolverTemplate {
  private initialPuzzle: Puzzle;
  private grid: SudokuGrid;
  constructor(puzzle: Puzzle) {
    this.initialPuzzle = puzzle;
    this.grid = { ...puzzle.sudokuGrid };
    console.log(puzzle.sudokuGrid);
    console.log(this.grid);
  }

  solve() {
    return this.initialPuzzle;
  }

  solveSection() {
    return;
  }
}

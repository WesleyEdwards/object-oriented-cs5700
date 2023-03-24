import { Puzzle, SudokuTemplate } from "../solver";

export class Backtrack implements SudokuTemplate {
  private initialPuzzle: Puzzle;
  constructor(puzzle: Puzzle) {
    this.initialPuzzle = puzzle;
  }

  solve() {
    return;
  }

  solveSection() {
    return;
  }
}

import { Puzzle, SolverTemplate } from "./SolverTemplate";

export class WalkSat implements SolverTemplate {
  private initialPuzzle: Puzzle;
  constructor(puzzle: Puzzle) {
    this.initialPuzzle = puzzle;
  }

  solve() {
    return this.initialPuzzle;
  }

  solveSection() {
    return;
  }
}

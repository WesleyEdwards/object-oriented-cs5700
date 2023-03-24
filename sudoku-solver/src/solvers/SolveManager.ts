import { Puzzle } from "../solver";

export class PuzzleSolver {
  initialPuzzle: Puzzle;
  constructor(initial: Puzzle) {
    this.initialPuzzle = initial;
  }

  solvePuzzle(): Puzzle {
    return this.initialPuzzle;
  }
}

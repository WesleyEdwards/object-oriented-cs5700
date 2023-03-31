import { Backtrack } from "../solvers/Backtrack";
import { SudokuGrid } from "../solvers/SolverTemplate";
import { FindInitialPossibilities } from "./solvingTechniques.ts/FindInitialPossibilities";
import { SoleCandidate } from "./solvingTechniques.ts/SoleCandidate";

export type SolverPossibility = "possibility" | "soleCandidate" | "backtrack";

export class SolveManager {
  private initialSolver: FindInitialPossibilities;
  private soleCandidate: SoleCandidate;
  private backtrack: Backtrack;
  constructor(workingGrid: SudokuGrid, possibleValues: string[]) {
    this.initialSolver = new FindInitialPossibilities(
      workingGrid,
      possibleValues
    );
    this.soleCandidate = new SoleCandidate(workingGrid, possibleValues);
    this.backtrack = new Backtrack(workingGrid);
  }

  findAll(type: SolverPossibility): SudokuGrid | null {
    this.initialSolver.findAll();
    switch (type) {
      case "possibility":
        return this.initialSolver.findAll();
      case "soleCandidate":
        return this.soleCandidate.findAll();
      case "backtrack":
        return this.backtrack.findAll();
    }
  }

  findOne(type: SolverPossibility): SudokuGrid | null {
    switch (type) {
      case "possibility":
        return this.initialSolver.findOne();
      case "soleCandidate":
        return this.soleCandidate.findOne();
    }
    return null;
  }

  updateHints() {
    this.initialSolver.findAll();
  }

  get isSolved(): boolean {
    return this.initialSolver.isSolved;
  }
}

import { SudokuGrid } from "../solvers/SolverTemplate";
import { FindInitialPossibilities } from "./solvingTechniques.ts/FindInitialPossibilities";
import { NakedSingle } from "./solvingTechniques.ts/NakedSingle";
import { SoleCandidate } from "./solvingTechniques.ts/SoleCandidate";
import { UniqueCandidate } from "./solvingTechniques.ts/UniqueCandidate";
export type SolverPossibility =
  | "possibility"
  | "soleCandidate"
  | "uniqueCandidate"
  | "nakedSingle";

export class SolveManager {
  private initialSolver: FindInitialPossibilities;
  private soleCandidate: SoleCandidate;
  private uniqueCandidate: UniqueCandidate;
  private nakedSingle: NakedSingle;
  constructor(workingGrid: SudokuGrid, possibleValues: string[]) {
    this.initialSolver = new FindInitialPossibilities(
      workingGrid,
      possibleValues
    );
    this.soleCandidate = new SoleCandidate(workingGrid);
    this.uniqueCandidate = new UniqueCandidate(workingGrid, possibleValues);
    this.nakedSingle = new NakedSingle(workingGrid);
  }

  findAll(type: SolverPossibility): SudokuGrid | null {
    this.initialSolver.findAll();
    switch (type) {
      case "possibility":
        return this.initialSolver.findAll();
      case "soleCandidate":
        return this.soleCandidate.findAll();
      case "uniqueCandidate":
        return this.uniqueCandidate.findAll();
      case "nakedSingle":
        return this.nakedSingle.findAll();
    }
  }

  findOne(type: SolverPossibility): SudokuGrid | null {
    switch (type) {
      case "possibility":
        return this.initialSolver.findOne();
      case "soleCandidate":
        return this.soleCandidate.findOne();
      case "uniqueCandidate":
        return this.uniqueCandidate.findOne();
      case "nakedSingle":
        return this.nakedSingle.findOne();
    }
  }

  updateHints() {
    this.initialSolver.findAll();
  }
}

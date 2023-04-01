import { Backtrack } from "../solvers/Backtrack";
import { SudokuGrid } from "../solvers/SolverTemplate";
import { FindInitialPossibilities } from "./solvingTechniques.ts/FindInitialPossibilities";
import { HiddenSingle } from "./solvingTechniques.ts/HiddenSingle";
import { SoleCandidate } from "./solvingTechniques.ts/SoleCandidate";

export type SolverPossibility =
  | "possibility"
  | "soleCandidate"
  | "hiddenSingle"
  | "backtrack";

export class SolveManager {
  private initialSolver: FindInitialPossibilities;
  private soleCandidate: SoleCandidate;
  private hiddenSingle: HiddenSingle;
  private backtrack: Backtrack;
  private grid: SudokuGrid;
  private possibleValues: string[];
  constructor(workingGrid: SudokuGrid, possibleValues: string[]) {
    this.grid = workingGrid;
    this.possibleValues = possibleValues;
    this.initialSolver = new FindInitialPossibilities(possibleValues);
    this.soleCandidate = new SoleCandidate();
    this.hiddenSingle = new HiddenSingle();
    this.backtrack = new Backtrack(workingGrid, possibleValues);
  }

  findAll(type: SolverPossibility): SudokuGrid | null {
    switch (type) {
      case "possibility":
        return this.initialSolver.findAll(this.grid);
      case "soleCandidate":
        return this.soleCandidate.findAll(this.grid);
      case "hiddenSingle":
        return this.hiddenSingle.findAll(this.grid);
      case "backtrack": {
        return this.backtrack.findAll();
      }
    }
  }

  get isSolved(): boolean {
    return this.grid.every((row) =>
      row.every((cell) => cell.assignedValue !== undefined)
    );
  }
}

// NakedSingle: Only One candidate in a cell
// HiddenSingle: Only One candidate in a row, column or box (Might have more in the box)
// NakedPair: Two candidates are same in two cells in a row, column or box

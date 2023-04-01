import { Backtrack } from "../solvers/Backtrack";
import { SudokuGrid } from "../solvers/SolverTemplate";
import { FindInitialPossibilities } from "./solvingTechniques.ts/FindInitialPossibilities";
import { HiddenSingle } from "./solvingTechniques.ts/HiddenSingle";
import { NakedDouble } from "./solvingTechniques.ts/NakedDouble";
import { SoleCandidate } from "./solvingTechniques.ts/SoleCandidate";

export type SolverPossibility =
  | "possibility"
  | "soleCandidate"
  | "hiddenSingle"
  | "all"
  | "nakedDouble"
  | "backtrack";

export class SolveManager {
  private initialSolver: FindInitialPossibilities;
  private soleCandidate: SoleCandidate;
  private hiddenSingle: HiddenSingle;
  private backtrack: Backtrack;
  private grid: SudokuGrid;
  private nakedDouble: NakedDouble;
  constructor(workingGrid: SudokuGrid, possibleValues: string[]) {
    this.grid = workingGrid;
    this.initialSolver = new FindInitialPossibilities(possibleValues);
    this.soleCandidate = new SoleCandidate();
    this.hiddenSingle = new HiddenSingle();
    this.backtrack = new Backtrack(workingGrid);
    this.nakedDouble = new NakedDouble();
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
      case "nakedDouble": {
        return this.nakedDouble.findOne(this.grid);
      }
      case "all": {
        for (let i = 0; i < 20; i++) {
          this.initialSolver.findAll(this.grid);
          this.soleCandidate.findAll(this.grid);
          this.hiddenSingle.findAll(this.grid);
        }
        return this.initialSolver.findAll(this.grid);
      }
    }
  }

  get isSolved(): boolean {
    return this.grid.every((row) =>
      row.every((cell) => cell.assignedValue !== undefined)
    );
  }
}

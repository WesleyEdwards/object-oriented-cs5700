import { Backtrack } from "../solvers/Backtrack";
import { SolveMethodTemplate, SudokuGrid } from "../solvers/SolverTemplate";
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
  private initialSolver: SolveMethodTemplate;
  private soleCandidate: SolveMethodTemplate;
  private hiddenSingle: SolveMethodTemplate;
  private backtrack: SolveMethodTemplate;
  private grid: SudokuGrid;
  private nakedDouble: SolveMethodTemplate;
  constructor(workingGrid: SudokuGrid, possibleValues: string[]) {
    this.grid = workingGrid;
    this.initialSolver = new FindInitialPossibilities(possibleValues);
    this.soleCandidate = new SoleCandidate();
    this.hiddenSingle = new HiddenSingle();
    this.backtrack = new Backtrack();
    this.nakedDouble = new NakedDouble(possibleValues);
  }

  solveUsingMethod(type: SolverPossibility): SudokuGrid | null {
    switch (type) {
      case "possibility":
        return this.initialSolver.findAll(this.grid);
      case "soleCandidate":
        return this.soleCandidate.findAll(this.grid);
      case "hiddenSingle":
        return this.hiddenSingle.findAll(this.grid);
      case "backtrack": {
        return this.backtrack.findAll(this.grid);
      }
      case "nakedDouble": {
        return this.nakedDouble.findAll(this.grid);
      }
      case "all": {
        this.initialSolver.findAll(this.grid);
        for (let i = 0; i < 20; i++) {
          this.soleCandidate.findAll(this.grid);
          this.hiddenSingle.findAll(this.grid);
          this.nakedDouble.findAll(this.grid);
        }
        return this.grid;
      }
    }
  }

  get isSolved(): boolean {
    return this.grid.every((row) =>
      row.every((cell) => cell.assignedValue !== undefined)
    );
  }
}

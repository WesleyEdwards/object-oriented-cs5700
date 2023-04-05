import { Backtrack } from "../solvers/Backtrack";
import { CellSolution, SudokuGrid } from "../solvers/SolverTemplate";
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
  private initialSolver: CellSolution;
  private soleCandidate: CellSolution;
  private hiddenSingle: CellSolution;
  private backtrack: CellSolution;
  private grid: SudokuGrid;
  private nakedDouble: CellSolution;
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
        this.solveAll();
        return this.backtrack.findAll(this.grid);
      }
      case "nakedDouble": {
        return this.nakedDouble.findAll(this.grid);
      }
      case "all": {
        return this.solveAll();
      }
    }
  }

  solveAll() {
    this.initialSolver.findAll(this.grid);
    for (let i = 0; i < 20; i++) {
      this.soleCandidate.findAll(this.grid);
      this.hiddenSingle.findAll(this.grid);
      this.nakedDouble.findAll(this.grid);
    }
    return this.grid;
  }

  get isSolved(): boolean {
    return this.grid.every((row) =>
      row.every((cell) => cell.assignedValue !== undefined)
    );
  }
}

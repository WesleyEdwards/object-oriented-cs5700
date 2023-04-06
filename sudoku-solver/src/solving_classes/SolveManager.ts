import { CellSolution, SudokuGrid } from "./SolverTemplate";
import { Backtrack } from "./Backtrack";
import { FindInitialPossibilities } from "../cell_solutions/FindInitialPossibilities";
import { HiddenSingle } from "../cell_solutions/HiddenSingle";
import { NakedDouble } from "../cell_solutions/NakedDouble";
import { SoleCandidate } from "../cell_solutions/SoleCandidate";

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
    this.backtrack = new Backtrack(possibleValues);
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
        this.initialSolver.findAll(this.grid);
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
    for (let i = 0; i < 30; i++) {
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

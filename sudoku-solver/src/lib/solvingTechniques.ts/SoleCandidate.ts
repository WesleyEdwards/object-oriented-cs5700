import {
  Cell,
  Puzzle,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { getBox } from "../utils";
import { FindInitialPossibilities } from "./FindInitialPossibilities";

export class SoleCandidate implements SolveMethodTemplate {
  findAll(grid: SudokuGrid): SudokuGrid {
    while (this.findOne(grid)) {
      this.findOne(grid);
    }
    return grid;
  }

  findOne(grid: SudokuGrid): SudokuGrid | null {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {
        const cell = grid[row][col];
        if (cell.possibleValues.length === 1) {
          cell.assignedValue = cell.possibleValues[0];
          cell.possibleValues = [];
          return grid;
        }
      }
    }
    return null;
  }
}

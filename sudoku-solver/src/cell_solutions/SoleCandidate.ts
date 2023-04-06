import { getBox } from "../lib/utils";
import {
  CellSolution,
  SudokuGrid,
  Cell,
} from "../solving_classes/SolverTemplate";

export class SoleCandidate implements CellSolution {
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
          this.updateBox(grid, cell);
          this.updateRow(grid, cell);
          this.updateCol(grid, cell);
          return grid;
        }
      }
    }
    return null;
  }

  updateBox(grid: SudokuGrid, cell: Cell) {
    const box = getBox(grid, cell);
    box.forEach((c) => {
      if (c.assignedValue) return;
      c.possibleValues = c.possibleValues.filter(
        (value) => value !== cell.assignedValue
      );
    });
  }

  updateRow(grid: SudokuGrid, cell: Cell) {
    const row = grid[cell.row];
    row.forEach((c) => {
      if (c.assignedValue) return;
      c.possibleValues = c.possibleValues.filter(
        (value) => value !== cell.assignedValue
      );
    });
  }

  updateCol(grid: SudokuGrid, cell: Cell) {
    const col = grid.map((row) => row[cell.col]);
    col.forEach((c) => {
      if (c.assignedValue) return;
      c.possibleValues = c.possibleValues.filter(
        (value) => value !== cell.assignedValue
      );
    });
  }
}

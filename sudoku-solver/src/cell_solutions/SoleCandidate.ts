import { getBox, value } from "../lib/utils";
import { CellSolution, SudokuGrid, Cell } from "../lib/SolverTemplate";

export class SoleCandidate implements CellSolution {
  grid: SudokuGrid = [];

  findAll(grid: SudokuGrid): SudokuGrid {
    this.grid = grid;
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
          this.checkBox(cell, value);
          this.checkRow(cell, value);
          this.checkCol(cell, value);
          return grid;
        }
      }
    }
    return null;
  }

  checkBox(cell: Cell, value: string) {
    const box = getBox(this.grid, cell);
    box.forEach((c) => {
      if (c.assignedValue) return;
      c.possibleValues = c.possibleValues.filter(
        (value) => value !== cell.assignedValue
      );
    });
    return true;
  }

  checkRow(cell: Cell, value: string) {
    const row = this.grid[cell.row];
    row.forEach((c) => {
      if (c.assignedValue) return;
      c.possibleValues = c.possibleValues.filter(
        (value) => value !== cell.assignedValue
      );
    });
    return true;
  }

  checkCol(cell: Cell, value: string) {
    const col = this.grid.map((row) => row[cell.col]);
    col.forEach((c) => {
      if (c.assignedValue) return;
      c.possibleValues = c.possibleValues.filter(
        (value) => value !== cell.assignedValue
      );
    });
    return true;
  }
}

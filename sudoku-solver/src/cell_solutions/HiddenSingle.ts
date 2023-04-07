import { getBox } from "../lib/utils";
import { CellSolution, SudokuGrid, Cell } from "../lib/SolverTemplate";

export class HiddenSingle implements CellSolution {
  private grid: SudokuGrid = [];
  findAll(grid: SudokuGrid): SudokuGrid {
    this.grid = grid;
    while (this.findOne(grid)) {
      this.findOne(grid);
    }
    return grid;
  }

  findOne(grid: SudokuGrid): SudokuGrid | null {
    // iterate through each cell. If a possible value does not exist elsewhere in the row, column or box, assign it to the cell
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {
        const cell = grid[row][col];
        if (cell.possibleValues.length > 0) {
          for (let i = 0; i < cell.possibleValues.length; i++) {
            const value = cell.possibleValues[i];
            if (
              this.checkRow(cell, value) &&
              this.checkCol(cell, value) &&
              this.checkBox(cell, value)
            ) {
              cell.assignedValue = value;
              cell.possibleValues = [];
              return grid;
            }
          }
        }
      }
    }
    return null;
  }

  checkRow(cell: Cell, value: string): boolean {
    return this.grid[cell.row].every((c) => {
      if (cell.col === c.col) return true;
      if (c.possibleValues.includes(value)) {
        return false;
      }
      return true;
    });
  }

  checkCol(cell: Cell, value: string): boolean {
    return this.grid.every((row) => {
      if (row[cell.col].row === cell.row) return true;
      if (row[cell.col].possibleValues.includes(value)) {
        return false;
      }
      return true;
    });
  }

  checkBox(cell: Cell, value: string): boolean {
    const box = getBox(this.grid, cell);
    return box.every((c) => {
      if (c.row === cell.row && c.col === cell.col) return true;
      if (c.possibleValues.includes(value)) {
        return false;
      }
      return true;
    });
  }
}

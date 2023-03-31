import {
  Cell,
  Puzzle,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { BoxWidthMap } from "../helpers";
import { getBox, getNonBoxCellsInRow } from "../utils";

export class RowInteraction implements SolveMethodTemplate {
  private grid: SudokuGrid;
  private possibleValues: string[];

  constructor(grid: SudokuGrid, possibleValues: string[]) {
    this.grid = grid;
    this.possibleValues = possibleValues;
  }

  findAll(): SudokuGrid {
    while (this.findOne()) {
      this.findOne();
    }
    return this.grid;
  }

  findOne(): SudokuGrid | null {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid.length; col++) {
        const cell = this.grid[row][col];
        if (cell.possibleValues.length > 0) {
          if (this.findUniqueCandidate(cell)) {
            return this.grid;
          }
        }
      }
    }
    return null;
  }

  findUniqueCandidate(cell: Cell): boolean {
    for (let i = 0; i < this.possibleValues.length; i++) {
      const value = this.possibleValues[i];

      const existsInRow = this.checkRow(cell, value);
      const existsInCol = this.checkCol(cell, value);
      const existsInBox = this.checkBox(cell, value);
      if (existsInBox || existsInCol || existsInRow) {
        continue;
      }
      cell.assignedValue = value;
      cell.possibleValues = [];
      return true;
    }
    return false;
  }

  checkRow(cell: Cell, value: string): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      const checkCell = this.grid[cell.row][i];
      if (checkCell.assignedValue === value) {
        return true;
      }
    }

    const otherBoxValues = getNonBoxCellsInRow(this.grid, cell.row, cell.col);
    for (let i = 0; i < otherBoxValues.length; i++) {
      const checkCell = otherBoxValues[i];
      for (let j = 0; j < checkCell.possibleValues.length; j++) {
        if (checkCell.possibleValues[j] === value) {
          const otherCellsInJBox = getBox(
            this.grid,
            checkCell.row,
            checkCell.col
          );
          for (let k = 0; k < otherCellsInJBox.length; k++) {
            const otherCellInJBox = otherCellsInJBox[k];
            // if (otherCellInJBox.col === cell.col) {
            //   continue;
            // }
            if (otherCellInJBox.possibleValues.includes(value)) {
              console.log("found a row interaction" + value);
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  checkCol(cell: Cell, value: string): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      const checkCell = this.grid[i][cell.col];
      if (checkCell.assignedValue === value) {
        return true;
      }
    }

    const otherBoxValues = getNonBoxCellsInRow(this.grid, cell.row, cell.col);
    for (let i = 0; i < otherBoxValues.length; i++) {
      const checkCell = otherBoxValues[i];
      for (let j = 0; j < checkCell.possibleValues.length; j++) {
        if (checkCell.possibleValues[j] === value) {
          const otherCellsInJBox = getBox(
            this.grid,
            checkCell.row,
            checkCell.col
          );
          for (let k = 0; k < otherCellsInJBox.length; k++) {
            const otherCellInJBox = otherCellsInJBox[k];
            // if (otherCellInJBox.row === cell.row) {
            //   continue;
            // }
            if (otherCellInJBox.possibleValues.includes(value)) {
              console.log("found a col interaction" + value);
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  checkBox(cell: Cell, value: string): boolean {
    const box = getBox(this.grid, cell.row, cell.col);
    for (let i = 0; i < box.length; i++) {
      const checkCell = box[i];
      if (checkCell.assignedValue === value) {
        return true;
      }
    }
    return false;
  }
}

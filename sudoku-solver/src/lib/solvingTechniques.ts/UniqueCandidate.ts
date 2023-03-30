import {
  Cell,
  Puzzle,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { BoxWidthMap } from "../helpers";
import { getBox } from "../utils";

export class UniqueCandidate implements SolveMethodTemplate {
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
    const box = getBox(this.grid, cell.row, cell.col);

    for (let i = 0; i < this.possibleValues.length; i++) {
      const value = this.possibleValues[i];
      let count = 0;

      const existsInRow = this.checkTheRow(cell, value);
      const existsInCol = this.checkTheCol(cell, value);
      const existsInBox = this.checkTheBox(box, value);
      if (existsInBox || existsInCol || existsInRow) {
        continue;
      }
      cell.assignedValue = value;
      cell.possibleValues = [];
      return true;
    }
    return false;
  }

  checkTheRow(cell: Cell, value: string): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      const checkCell = this.grid[cell.row][i];
      if (checkCell.assignedValue === value) {
        return true;
      }
    }
    return false;
  }

  checkTheCol(cell: Cell, value: string): boolean {
    for (let i = 0; i < this.grid.length; i++) {
      const checkCell = this.grid[i][cell.col];
      if (checkCell.assignedValue === value) {
        return true;
      }
    }
    return false;
  }

  checkTheBox(box: Cell[], value: string): boolean {
    for (let i = 0; i < box.length; i++) {
      const checkCell = box[i];
      if (checkCell.assignedValue === value) {
        return true;
      }
    }
    return false;
  }

  checkRow() {
    return;
  }

  checkCol() {
    return;
  }

  checkBox() {
    return;
  }
}

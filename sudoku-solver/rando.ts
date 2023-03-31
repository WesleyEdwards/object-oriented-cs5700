import { BoxWidthMap } from "../lib/helpers";
import { getBox } from "../lib/utils";
import {
  Cell,
  Puzzle,
  SolveMethodTemplate,
  SudokuGrid,
} from "./SolverTemplate";

export class Backtrack implements SolveMethodTemplate {
  private grid: SudokuGrid;
  private possibleValues: string[];
  constructor(grid: SudokuGrid, possibleValues: string[]) {
    this.grid = grid;
    this.possibleValues = possibleValues;
  }

  findAll(): SudokuGrid {
    this.solveSudoku(0, 0);
    console.log(this.grid);
    return this.grid;
  }

  solveSudoku(row: number, col: number): boolean {
    if (row === this.grid.length - 1 && col === this.grid[0].length) {
      return true;
    }

    if (col === this.grid[0].length) {
      row++;
      col = 0;
    }

    const cell = this.grid[row][col];

    if (cell.assignedValue !== undefined) {
      return this.solveSudoku(row, col + 1);
    }

    for (let i = 0; i <= this.possibleValues.length; i++) {
      const value = this.possibleValues[i];
      if (this.isNumberValid(cell, value)) {
        cell.assignedValue = i.toString();

        if (this.solveSudoku(row, col + 1)) {
          return true;
        }
      }

      cell.assignedValue = undefined;
    }

    return false;
  }

  isNumberValid(cell: Cell, num: string): boolean {
    const existsInRow = this.checkRow(cell, num);
    const existsInCol = this.checkCol(cell, num);
    const existsInBox = this.checkBox(cell, num);

    if (existsInRow || existsInCol || existsInBox) {
      return false;
    }
    return true;
  }

  findOne(): SudokuGrid | null {
    return null;
  }
  checkBox(cell: Cell, value: string): boolean {
    const sudokuBox: Cell[] = getBox(this.grid, cell.row, cell.col);
    const usedValues: string[] = sudokuBox
      .filter((cell) => cell.assignedValue !== undefined)
      .map((cell) => cell.assignedValue!);
    return !usedValues.includes(value);
  }

  checkCol(cell: Cell, value: string): boolean {
    const sudokuCol: Cell[] = this.grid.map((row) => row[cell.col]);
    const usedValues: string[] = sudokuCol
      .filter((cell) => cell.assignedValue !== undefined)
      .map((cell) => cell.assignedValue!);
    return !usedValues.includes(value);
  }

  checkRow(cell: Cell, value: string): boolean {
    const sudokuRow: Cell[] = this.grid[cell.row];
    const usedValues: string[] = sudokuRow
      .filter((cell) => cell.assignedValue !== undefined)
      .map((cell) => cell.assignedValue!);
    return !usedValues.includes(value);
  }
}

import { BoxWidthMap } from "../lib/helpers";
import { getBox } from "../lib/utils";
import { Cell, SudokuGrid } from "./SolverTemplate";

export class Backtrack {
  private grid: SudokuGrid;
  private possibleValues: string[];
  constructor(grid: SudokuGrid, possibleValues: string[]) {
    this.grid = grid;
    this.possibleValues = possibleValues;
  }

  findAll(): SudokuGrid {
    this.solveSudoku(this.grid, 0, 0);
    return this.grid;
  }

  solveSudoku(grid: SudokuGrid, row: number, col: number): boolean {
    if (row === grid.length - 1 && col === grid[0].length) return true;

    if (col === grid[0].length) {
      row++;
      col = 0;
    }

    const cell = grid[row][col];

    if (cell.assignedValue !== undefined) {
      return this.solveSudoku(grid, row, col + 1);
    }

    for (let num = 1; num <= this.possibleValues.length; num++) {
      const value = this.possibleValues[num - 1];

      if (this.isNumberValid(grid, row, col, value)) {
        cell.assignedValue = value;

        if (this.solveSudoku(grid, row, col + 1)) {
          return true;
        }
      }
      cell.assignedValue = undefined;
    }

    return false;
  }

  isNumberValid(grid: SudokuGrid, row: number, col: number, num: string) {
    const sudokuRow: Cell[] = grid[row];
    const sudokuCol: Cell[] = grid.map((row) => row[col]);
    const sudokuBox: Cell[] = getBox(grid, row, col);
    const cells = [...sudokuRow, ...sudokuCol, ...sudokuBox];
    const usedValues: string[] = cells
      .filter((cell) => cell.assignedValue !== undefined)
      .map((cell) => cell.assignedValue!);
    return !usedValues.includes(num);
  }
}

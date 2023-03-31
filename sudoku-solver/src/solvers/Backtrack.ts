import { BoxWidthMap } from "../lib/helpers";
import { Cell, SudokuGrid } from "./SolverTemplate";

export class Backtrack {
  private grid: SudokuGrid;
  constructor(grid: SudokuGrid) {
    this.grid = grid;
  }

  findAll(): SudokuGrid {
    this.solveSudoku(this.grid, 0, 0);
    return this.grid;
  }

  solveSudoku(grid: SudokuGrid, row: number, col: number): boolean {
    if (row === grid.length - 1 && col === grid[0].length) {
      return true;
    }

    if (col === grid[0].length) {
      row++;
      col = 0;
    }

    if (grid[row][col].assignedValue !== undefined) {
      return this.solveSudoku(grid, row, col + 1);
    }

    for (let num = 1; num <= grid.length; num++) {
      if (this.isNumberValid(grid, row, col, num)) {
        grid[row][col].assignedValue = num.toString();

        if (this.solveSudoku(grid, row, col + 1)) {
          return true;
        }
      }

      grid[row][col].assignedValue = undefined;
    }

    return false;
  }

  isNumberValid(grid: SudokuGrid, row: number, col: number, num: number) {
    const sudokuRow: Cell[] = grid[row];
    const sudokuCol: Cell[] = grid.map((row) => row[col]);
    const sudokuBox: Cell[] = this.getBox(grid, row, col);
    const cells = [...sudokuRow, ...sudokuCol, ...sudokuBox];
    const usedValues: string[] = cells
      .filter((cell) => cell.assignedValue !== undefined)
      .map((cell) => cell.assignedValue!);
    return !usedValues.includes(num.toString());
  }

  getBox(grid: SudokuGrid, row: number, col: number) {
    const width = BoxWidthMap[grid.length];
    const box: Cell[] = [];
    const boxRowStart = Math.floor(row / width) * width;
    const boxColStart = Math.floor(col / width) * width;
    for (let i = boxRowStart; i < boxRowStart + width; i++) {
      for (let j = boxColStart; j < boxColStart + width; j++) {
        box.push(grid[i][j]);
      }
    }
    return box;
  }
}

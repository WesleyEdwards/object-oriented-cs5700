import { BoxWidthMap } from "../lib/helpers";
import { getBox } from "../lib/utils";
import { Cell, CellSolution, SudokuGrid } from "./SolverTemplate";

export class Backtrack implements CellSolution {
  private grid: SudokuGrid;
  private width: number;
  constructor() {
    this.grid = [];
    this.width = this.grid.length;
  }

  findAll(grid: SudokuGrid): SudokuGrid {
    this.grid = grid;
    return this.solve();
  }

  solve() {
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

    for (let num = 0; num <= grid[row][col].possibleValues.length - 1; num++) {
      if (
        this.isNumberValid(grid[row][col], grid[row][col].possibleValues[num])
      ) {
        grid[row][col].assignedValue = grid[row][col].possibleValues[num];
        if (this.solveSudoku(grid, row, col + 1)) {
          return true;
        }
      }

      grid[row][col].assignedValue = undefined;
    }

    return false;
  }

  solveSection() {
    return;
  }

  isNumberValid(cell: Cell, num: string): boolean {
    for (let i = 0; i < this.width; i++) {
      if (this.grid[cell.row][i].assignedValue === num) return false;
      if (this.grid[i][cell.col].assignedValue === num) return false;
    }
    const sudokuBox: string[] = getBox(this.grid, cell).map(
      (cell) => cell.assignedValue ?? ""
    );
    if (sudokuBox.includes(num.toString())) return false;
    return true;
  }
}

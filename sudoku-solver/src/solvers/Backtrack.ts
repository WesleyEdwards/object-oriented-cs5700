import { BoxWidthMap } from "../lib/helpers";
import { getBox } from "../lib/utils";
import { Cell, SolveMethodTemplate, SudokuGrid } from "./SolverTemplate";

export class Backtrack implements SolveMethodTemplate {
  private grid: SudokuGrid;
  constructor() {
    this.grid = [];
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

    for (let num = 1; num <= grid[row][col].possibleValues.length; num++) {
      if (
        this.isNumberValid(
          grid[row][col],
          grid[row][col].possibleValues[num - 1]
        )
      ) {
        grid[row][col].assignedValue = grid[row][col].possibleValues[num - 1];
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
    const sudokuRow: string[] = this.grid[cell.row].map(
      (cell) => cell.assignedValue ?? ""
    );
    if (sudokuRow.includes(num.toString())) return false;

    const sudokuCol: string[] = this.grid.map(
      (row) => row[cell.col].assignedValue ?? ""
    );
    if (sudokuCol.includes(num.toString())) return false;
    const sudokuBox: string[] = getBox(this.grid, cell).map(
      (cell) => cell.assignedValue ?? ""
    );
    if (sudokuBox.includes(num.toString())) return false;
    return true;
  }
}

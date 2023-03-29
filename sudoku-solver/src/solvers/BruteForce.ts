import { Cell, Puzzle, SolverTemplate, SudokuGrid } from "./SolverTemplate";

export class BruteForce implements SolverTemplate {
  private initialPuzzle: Puzzle;
  constructor(puzzle: Puzzle) {
    this.initialPuzzle = puzzle;
  }

  solve() {
    this.solveSudoku(this.initialPuzzle.sudokuGrid, 0, 0);
    console.log(this.initialPuzzle);
    return this.initialPuzzle;
  }

  solveSudoku(grid: SudokuGrid, row: number, col: number): boolean {
    if (row === grid.length - 1 && col === grid[0].length) {
      return true;
    }

    if (col === grid[0].length) {
      row++;
      col = 0;
    }

    if (grid[row][col].assignedValue !== "0") {
      return this.solveSudoku(grid, row, col + 1);
    }

    for (let num = 1; num <= 9; num++) {
      if (this.isNumberValid(grid, row, col, num)) {
        grid[row][col].assignedValue = num.toString();

        if (this.solveSudoku(grid, row, col + 1)) {
          return true;
        }
      } else {
        console.log("not valid");
      }

      grid[row][col].assignedValue = "0";
    }

    return false;
  }

  solveSection() {
    return;
  }

  isNumberValid(grid: SudokuGrid, row: number, col: number, num: number) {
    const sudokuRow: Cell[] = this.initialPuzzle.sudokuGrid[row];
    const sudokuCol: Cell[] = this.initialPuzzle.sudokuGrid.map(
      (row) => row[col]
    );
    const sudokuBox: Cell[] = this.getBox(grid, row, col);
    const sudokuRowValues: string[] = sudokuRow.map(
      (cell) => cell.assignedValue || ""
    );
    const sudokuColValues: string[] = sudokuCol.map(
      (cell) => cell.assignedValue || ""
    );
    const sudokuBoxValues: string[] = sudokuBox.map(
      (cell) => cell.assignedValue || ""
    );
    const usedValues = [
      ...sudokuRowValues,
      ...sudokuColValues,
      ...sudokuBoxValues,
    ];
    console.log(!usedValues.includes(num.toString()));
    return !usedValues.includes(num.toString());
  }

  getBox(grid: SudokuGrid, row: number, col: number) {
    const box: Cell[] = [];
    const boxRowStart = Math.floor(row / 3) * 3;
    const boxColStart = Math.floor(col / 3) * 3;
    for (let i = boxRowStart; i < boxRowStart + 3; i++) {
      for (let j = boxColStart; j < boxColStart + 3; j++) {
        box.push(grid[i][j]);
      }
    }
    return box;
  }
}

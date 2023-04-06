import { Cell, CellSolution, SudokuGrid } from "../../solvers/SolverTemplate";

export class Backtrack implements CellSolution {
  private sudoku: Cell[][];
  private possibleValues: string[];
  private readonly UNASSIGNED: undefined = undefined;
  private readonly SIZE: number;
  private readonly BOX_SIZE: number;

  constructor(possibleValues: string[]) {
    this.sudoku = [];
    this.possibleValues = possibleValues;
    this.SIZE = this.sudoku.length;
    this.BOX_SIZE = Math.sqrt(this.SIZE);
  }

  findAll(grid: SudokuGrid): SudokuGrid | null {
    this.sudoku = grid;
    if (this.solveSudoku()) {
      return this.sudoku;
    } else {
      return null;
    }
  }

  solveSudoku(): boolean {
    for (let row = 0; row < this.SIZE; row++) {
      for (let col = 0; col < this.SIZE; col++) {
        const thisCell = this.sudoku[row][col];
        if (thisCell.assignedValue === this.UNASSIGNED) {
          for (
            let number = 0;
            number <= thisCell.possibleValues.length - 1;
            number++
          ) {
            if (this.isAllowed(row, col, thisCell.possibleValues.at(number))) {
              thisCell.assignedValue = thisCell.possibleValues.at(number);
              if (this.solveSudoku()) {
                return true;
              } else {
                thisCell.assignedValue = this.UNASSIGNED;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  private containsInRow(row: number, number: string): boolean {
    for (let i = 0; i < this.SIZE; i++) {
      if (this.sudoku[row][i].assignedValue === number) {
        return true;
      }
    }
    return false;
  }

  private containsInCol(col: number, number: string): boolean {
    for (let i = 0; i < this.SIZE; i++) {
      if (!this.sudoku[i][col]?.assignedValue) continue;
      if (this.sudoku[i][col].assignedValue === number) {
        return true;
      }
    }
    return false;
  }

  private containsInBox(
    row: number,
    col: number,
    numberToCheck: string
  ): boolean {
    const r = row - (row % this.BOX_SIZE);
    const c = col - (col % this.BOX_SIZE);
    for (let i = r; i < r + this.BOX_SIZE; i++) {
      for (let j = c; j < c + this.BOX_SIZE; j++) {
        if (this.sudoku[i][j].assignedValue === numberToCheck) {
          return true;
        }
      }
    }
    return false;
  }

  private isAllowed(
    row: number,
    col: number,
    testValue: string | undefined
  ): boolean {
    if (testValue === undefined) return false;
    return !(
      this.containsInRow(row, testValue) ||
      this.containsInCol(col, testValue) ||
      this.containsInBox(row, col, testValue)
    );
  }
}

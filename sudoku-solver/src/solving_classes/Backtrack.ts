import { Cell, CellSolution, SudokuGrid } from "../lib/SolverTemplate";

export class Backtrack implements CellSolution {
  private sudoku: Cell[][];
  private readonly SIZE: number;
  private readonly BOX_SIZE: number;

  constructor(possibleValues: string[]) {
    this.sudoku = [];
    this.SIZE = possibleValues.length;
    this.BOX_SIZE = Math.sqrt(this.SIZE);
  }

  findAll(grid: SudokuGrid): SudokuGrid | null {
    this.sudoku = grid;
    if (this.solveSudoku()) {
      this.solveSudoku();
      return this.sudoku;
    } else {
      return null;
    }
  }

  solveSudoku(): boolean {
    for (let row = 0; row < this.SIZE; row++) {
      for (let col = 0; col < this.SIZE; col++) {
        const thisCell = this.sudoku[row][col];
        if (thisCell.assignedValue === undefined) {
          for (
            let number = 0;
            number < thisCell.possibleValues.length;
            number++
          ) {
            if (this.isAllowed(thisCell, thisCell.possibleValues.at(number))) {
              thisCell.assignedValue = thisCell.possibleValues.at(number);
              if (this.solveSudoku()) {
                return true;
              } else {
                thisCell.assignedValue = undefined;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  checkRow(cell: Cell, value: string): boolean {
    const { row } = cell;
    for (let i = 0; i < this.SIZE; i++) {
      if (this.sudoku[row][i].assignedValue === value) {
        return true;
      }
    }
    return false;
  }

  checkCol(cell: Cell, value: string): boolean {
    const { col } = cell;
    for (let i = 0; i < this.SIZE; i++) {
      if (!this.sudoku[i][col]?.assignedValue) continue;
      if (this.sudoku[i][col].assignedValue === value) {
        return true;
      }
    }
    return false;
  }

  checkBox(cell: Cell, value: string): boolean {
    const { row, col } = cell;
    const r = row - (row % this.BOX_SIZE);
    const c = col - (col % this.BOX_SIZE);
    for (let i = r; i < r + this.BOX_SIZE; i++) {
      for (let j = c; j < c + this.BOX_SIZE; j++) {
        if (this.sudoku[i][j].assignedValue === value) {
          return true;
        }
      }
    }
    return false;
  }

  private isAllowed(cell: Cell, testValue: string | undefined): boolean {
    if (testValue === undefined) return false;
    return !(
      this.checkRow(cell, testValue) ||
      this.checkCol(cell, testValue) ||
      this.checkBox(cell, testValue)
    );
  }

  findOne(): SudokuGrid | null {
    return null;
  }
}

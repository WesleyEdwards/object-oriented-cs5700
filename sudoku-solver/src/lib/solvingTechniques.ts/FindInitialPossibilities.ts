import {
  Cell,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { getBox } from "../utils";

export class FindInitialPossibilities implements SolveMethodTemplate {
  private grid: SudokuGrid;
  constructor(grid: SudokuGrid) {
    this.grid = grid;
  }

  findOne() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid.length; col++) {
        const cell = this.grid[row][col];
        if (cell.originalValue || cell.possibleValues.length > 0) continue;
        const possibleValues = this.findPossibleValues(cell);
        if (possibleValues.possibleValues.length > 0) {
          return this.grid;
        }
      }
    }
    return null;
  }

  findAll(): SudokuGrid {
    const sudokuGrid = this.grid.map((row) =>
      row.map((cell) => this.findPossibleValues(cell))
    );
    return sudokuGrid;
  }

  findPossibleValues(cell: Cell): Cell {
    if (cell.originalValue) return cell;
    cell.possibleValues = [];
    for (let i = 1; i <= this.grid.length; i++) {
      if (this.isNumberValid(cell, i)) {
        cell.possibleValues.push(i.toString());
      }
    }
    return cell;
  }

  isNumberValid(cell: Cell, num: number) {
    const { row, col } = cell;
    const sudokuRow: Cell[] = this.grid[row];
    const sudokuCol: Cell[] = this.grid.map((row) => row[col]);
    const sudokuBox: Cell[] = getBox(this.grid, row, col);

    const rowColBox = [...sudokuRow, ...sudokuCol, ...sudokuBox];
    const used: string[] = [];

    rowColBox.forEach((cell) => {
      if (cell.originalValue && !used.includes(cell.originalValue)) {
        used.push(cell.originalValue);
      }
    });

    return !used.includes(num.toString());
  }

  checkCol() {
    return;
  }
  checkRow() {
    return;
  }
  checkBox() {
    return;
  }
}

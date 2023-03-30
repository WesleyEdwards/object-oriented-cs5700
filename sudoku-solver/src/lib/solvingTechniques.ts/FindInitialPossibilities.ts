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

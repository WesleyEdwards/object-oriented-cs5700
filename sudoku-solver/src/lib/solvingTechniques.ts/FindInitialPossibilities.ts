import {
  Cell,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { getBox } from "../utils";

export class FindInitialPossibilities implements SolveMethodTemplate {
  private grid: SudokuGrid;
  private possibleValues: string[];
  constructor(grid: SudokuGrid, possibleValues: string[]) {
    this.grid = grid;
    this.possibleValues = possibleValues;
  }

  findAll(): SudokuGrid {
    const sudokuGrid = this.grid.map((row) =>
      row.map((cell) => this.findPossibleValues(cell))
    );
    return sudokuGrid;
  }

  findOne() {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid.length; col++) {
        const cell = this.grid[row][col];
        if (cell.assignedValue || cell.possibleValues.length > 0) continue;
        this.findPossibleValues(cell);
        return this.grid;
      }
    }
    return null;
  }

  findPossibleValues(cell: Cell): Cell {
    cell.possibleValues = [];
    if (cell.assignedValue) return cell;
    cell.possibleValues = [];
    this.possibleValues.forEach((value) => {
      if (this.isNumberValid(cell, value)) {
        cell.possibleValues.push(value);
      }
    });
    return cell;
  }

  isNumberValid(cell: Cell, value: string) {
    const existsInRow = this.checkRow(cell, value);
    const existsInCol = this.checkCol(cell, value);
    const existsInBox = this.checkBox(cell, value);

    return !existsInRow && !existsInCol && !existsInBox;
  }

  checkRow(cell: Cell, value: string): boolean {
    const rowCells = this.grid[cell.row];
    const values = rowCells.map((cell) => cell.assignedValue);
    return values.includes(value);
  }

  checkCol(cell: Cell, value: string): boolean {
    const colCells = this.grid.map((row) => row[cell.col]);
    const values = colCells.map((cell) => cell.assignedValue);
    return values.includes(value);
  }

  checkBox(cell: Cell, value: string): boolean {
    const { row, col } = cell;
    const boxCells = getBox(this.grid, row, col);
    const values = boxCells.map((cell) => cell.assignedValue);
    return values.includes(value);
  }
}

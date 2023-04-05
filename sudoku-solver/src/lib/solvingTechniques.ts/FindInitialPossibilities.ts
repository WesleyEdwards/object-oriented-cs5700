import {
  Cell,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { getBox } from "../utils";

export class FindInitialPossibilities implements SolveMethodTemplate {
  private possibleValues: string[];
  constructor(possibleValues: string[]) {
    this.possibleValues = possibleValues;
  }

  findAll(grid: SudokuGrid): SudokuGrid {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {
        const cell = grid[row][col];
        this.findPossibleValues(grid, cell);
      }
    }
    return grid;
  }

  findOne(grid: SudokuGrid): SudokuGrid | null {
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {
        const cell = grid[row][col];
        if (cell.assignedValue || cell.possibleValues.length > 0) continue;
        this.findPossibleValues(grid, cell);
        return grid;
      }
    }
    return null;
  }

  findPossibleValues(grid: SudokuGrid, cell: Cell): Cell {
    cell.possibleValues = [];
    if (cell.assignedValue) return cell;
    cell.possibleValues = [];
    this.possibleValues.forEach((value) => {
      if (this.isNumberValid(grid, cell, value)) {
        cell.possibleValues.push(value);
      }
    });
    return cell;
  }

  isNumberValid(grid: SudokuGrid, cell: Cell, value: string) {
    const existsInRow = this.checkRow(grid, cell, value);
    const existsInCol = this.checkCol(grid, cell, value);
    const existsInBox = this.checkBox(grid, cell, value);

    return !existsInRow && !existsInCol && !existsInBox;
  }

  checkRow(grid: SudokuGrid, cell: Cell, value: string): boolean {
    const rowCells = grid[cell.row];
    const values = rowCells.map((cell) => cell.assignedValue);
    return values.includes(value);
  }

  checkCol(grid: SudokuGrid, cell: Cell, value: string): boolean {
    const colCells = grid.map((row) => row[cell.col]);
    const values = colCells.map((cell) => cell.assignedValue);
    return values.includes(value);
  }

  checkBox(grid: SudokuGrid, cell: Cell, value: string): boolean {
    const boxCells = getBox(grid, cell);
    const values = boxCells.map((cell) => cell.assignedValue);
    return values.includes(value);
  }
}

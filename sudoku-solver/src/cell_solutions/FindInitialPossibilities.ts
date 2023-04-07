import { Cell, CellSolution, SudokuGrid } from "../lib/SolverTemplate";
import { getBox } from "../lib/utils";

export class FindInitialPossibilities implements CellSolution {
  private possibleValues: string[];
  private grid: SudokuGrid;
  constructor(possibleValues: string[]) {
    this.grid = [];
    this.possibleValues = possibleValues;
  }

  findAll(grid: SudokuGrid): SudokuGrid {
    this.grid = grid;
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid.length; col++) {
        const cell = grid[row][col];
        this.findPossibleValues(grid, cell);
      }
    }
    return grid;
  }

  findOne(): SudokuGrid | null {
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid.length; col++) {
        const cell = this.grid[row][col];
        if (cell.assignedValue || cell.possibleValues.length > 0) continue;
        this.findPossibleValues(this.grid, cell);
        return this.grid;
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
    const boxCells = getBox(this.grid, cell);
    const values = boxCells.map((cell) => cell.assignedValue);
    return values.includes(value);
  }
}

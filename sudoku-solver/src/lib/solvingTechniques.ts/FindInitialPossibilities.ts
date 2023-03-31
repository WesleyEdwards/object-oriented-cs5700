import {
  Cell,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { getBox } from "../utils";
import { BoxWidthMap } from "../helpers";

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

  get isSolved(): boolean {
    return this.grid.every((row) =>
      row.every((cell) => cell.assignedValue !== undefined)
    );
  }

  findRedundants(): SudokuGrid {
    const boxes = this.groupByBoxes();
    const rowRepeats: RowRepeat[] = [];
    boxes.forEach((box) => {
      const rowReps: RowRepeat[] = this.findRowRepeats(box);
      rowRepeats.push(...rowReps);
    });
    rowRepeats.forEach((repeat) => {
      const { row, value, originBoxCols } = repeat;

      this.grid[row].map((cell) => {
        if (!originBoxCols.includes(cell.col)) return cell;
        return cell.possibleValues.splice(
          cell.possibleValues.indexOf(value),
          1
        );
      });
    });
    return this.grid;
  }

  findRowRepeats(box: Cell[]): RowRepeat[] {
    const howManyRows = BoxWidthMap[this.grid.length];
    const repeats: RowRepeat[] = [];

    for (let i = 0; i < howManyRows; i++) {
      const row = box.filter((cell) => cell.row === i);
      const assignedValues: string[] = row
        .map((cell) => cell.possibleValues)
        .flat()
        .filter((c) => c !== undefined) as string[];
      const assignedValuesNotInOtherRows = assignedValues.filter((value) => {
        const otherRows = box.filter((cell) => cell.row !== i);
        const otherRowValues = otherRows
          .map((cell) => cell.possibleValues)
          .flat();
        return !otherRowValues.includes(value);
      });
      const uniqueValues = [...new Set(assignedValuesNotInOtherRows)];
      if (uniqueValues.length > 0) {
        repeats.push({
          row: i,
          value: uniqueValues[0],
          originBoxCols: row.map((cell) => cell.col),
        });
      }
    }

    return repeats;
  }

  groupByBoxes(): Cell[][] {
    const boxGroupings = [];
    const width = BoxWidthMap[this.grid.length];
    for (let i = 0; i < this.grid.length; i += width) {
      for (let j = 0; j < this.grid.length; j += width) {
        const box = getBox(this.grid, i, j);
        boxGroupings.push(box);
      }
    }
    return boxGroupings;
  }
}

type RowRepeat = {
  row: number;
  value: string;
  originBoxCols: number[];
};

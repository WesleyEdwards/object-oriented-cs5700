import {
  Puzzle,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { BoxWidthMap } from "../helpers";
import { getBox } from "../utils";

export class NakedSingle implements SolveMethodTemplate {
  private grid: SudokuGrid;
  private dimensions: number;
  private boxWidth: number;

  constructor(grid: SudokuGrid) {
    this.grid = grid;
    this.dimensions = grid.length;
    this.boxWidth = BoxWidthMap[this.dimensions];
  }

  findAll(): SudokuGrid {
    this.checkRow();
    this.checkCol();
    this.checkBox();
    return this.grid;
  }

  checkRow() {
    for (let row = 0; row < this.dimensions; row++) {
      const rowCells = this.grid[row];
      const assignedValues = rowCells
        .filter((cell) => cell.assignedValue !== undefined)
        .map((cell) => cell.assignedValue!);
      const possibleValues = rowCells
        .filter((cell) => cell.assignedValue === undefined)
        .map((cell) => cell.possibleValues)
        .flat();
      const nakedSingle = possibleValues.find(
        (value) => !assignedValues.includes(value)
      );
      if (nakedSingle) {
        const nakedSingleCell = rowCells.find((cell) =>
          cell.possibleValues.includes(nakedSingle)
        );
        if (nakedSingleCell) {
          nakedSingleCell.assignedValue = nakedSingle;
          nakedSingleCell.possibleValues = [];
        }
      }
    }
  }

  checkCol() {
    for (let col = 0; col < this.dimensions; col++) {
      const colCells = this.grid.map((row) => row[col]);
      const assignedValues = colCells
        .filter((cell) => cell.assignedValue !== undefined)
        .map((cell) => cell.assignedValue!);
      const possibleValues = colCells
        .filter((cell) => cell.assignedValue === undefined)
        .map((cell) => cell.possibleValues)
        .flat();
      const nakedSingle = possibleValues.find(
        (value) => !assignedValues.includes(value)
      );
      if (nakedSingle) {
        const nakedSingleCell = colCells.find((cell) =>
          cell.possibleValues.includes(nakedSingle)
        );
        if (nakedSingleCell) {
          nakedSingleCell.assignedValue = nakedSingle;
          nakedSingleCell.possibleValues = [];
        }
      }
    }
  }

  checkBox() {
    for (let row = 0; row < this.dimensions; row += this.boxWidth) {
      for (let col = 0; col < this.dimensions; col += this.boxWidth) {
        const boxCells = getBox(this.grid, row, col);
        const assignedValues = boxCells
          .filter((cell) => cell.assignedValue !== undefined)
          .map((cell) => cell.assignedValue!);
        const possibleValues = boxCells
          .filter((cell) => cell.assignedValue === undefined)
          .map((cell) => cell.possibleValues)
          .flat();
        const nakedSingle = possibleValues.find(
          (value) => !assignedValues.includes(value)
        );
        if (nakedSingle) {
          const nakedSingleCell = boxCells.find((cell) =>
            cell.possibleValues.includes(nakedSingle)
          );
          if (nakedSingleCell) {
            nakedSingleCell.assignedValue = nakedSingle;
            nakedSingleCell.possibleValues = [];
          }
        }
      }
    }
  }
}

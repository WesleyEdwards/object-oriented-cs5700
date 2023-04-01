import {
  Cell,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { BoxWidthMap } from "../helpers";
import { getBox, getGridBoxes } from "../utils";

export class NakedDouble implements SolveMethodTemplate {
  findAll(grid: SudokuGrid): SudokuGrid {
    while (this.findOne(grid)) {
      this.findOne(grid);
    }
    return grid;
  }

  findOne(grid: SudokuGrid): SudokuGrid | null {
    const size = BoxWidthMap[grid.length];
    // find in box all values in the same row or column.
    // NakedPair: Two candidates are same in two cells in a row, column or box
    const boxes: Cell[][] = getGridBoxes(grid);
    const doubleRows: DoubleRowInfo[] = this.findDoubleRowInfo(boxes);
    // console.log(doubleRows);
    doubleRows.forEach((doubleRow) => {
      const otherBoxesInRow = boxes.filter((boxCells) => {
        return (
          boxCells.every((c) => c.col !== doubleRow.col1) &&
          boxCells.some((c) => c.row === doubleRow.row)
        );
      });
      otherBoxesInRow.forEach((box1) => {
        const rowCells = box1.filter((c) => c.row === doubleRow.row);
        rowCells.forEach((c) => {
          if (c.assignedValue) return;
          if (c.possibleValues.length === 1) {
            c.assignedValue = c.possibleValues[0];
          }
          c.possibleValues = c.possibleValues.filter(
            (value) => value !== doubleRow.value
          );
        });
      });
    });
    return grid;
  }

  checkRow(cell: Cell, value: string, grid: SudokuGrid): boolean {
    return false;
  }

  checkCol(cell: Cell, value: string, grid: SudokuGrid): boolean {
    return false;
  }

  checkBox(cell: Cell, value: string, grid: SudokuGrid): boolean {
    return false;
  }

  findDoubleRowInfo(boxes: Cell[][]): DoubleRowInfo[] {
    const doubleRows: DoubleRowInfo[] = [];
    for (let i = 0; i < boxes.length; i++) {
      const boxCells = boxes[i];
      const rowIndexes = [...new Set(boxCells.map((cell) => cell.row))];
      rowIndexes.forEach((row) => {
        const rowCells = boxCells.filter((cell) => cell.row === row);
        const rowValues = rowCells.map((cell) => cell.possibleValues).flat();
        const uniqueValuesInRow = [...new Set(rowValues)];
        const otherValuesInBox = boxCells
          .filter((cell) => cell.row !== row)
          .map((cell) => cell.possibleValues)
          .flat();
        const doubleValues = uniqueValuesInRow.filter(
          (value) => !otherValuesInBox.includes(value)
        );
        doubleValues.forEach((value) => {
          doubleRows.push({
            row,
            value,
            col1: rowCells[0].col,
            col2: rowCells.length > 1 ? rowCells[1].col : rowCells[0].col,
          });
        });
      });
    }
    return doubleRows;
  }
}
type DoubleRowInfo = {
  row: number;
  col1: number;
  col2: number;
  value: string;
};

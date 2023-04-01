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
    console.log(doubleRows);
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.assignedValue) return;
        if (cell.possibleValues.length !== 2) return;
        doubleRows.forEach((info) => {
          if (info.cell1.row !== cell.row) return;
          if (info.cell1.col === cell.col) return;
          if (info.cell2.col === cell.col) return;
          if (cell.possibleValues.length === 1)
            cell.assignedValue = cell.possibleValues[0];
          console.log(info.cell1, info.cell2, cell);
          cell.possibleValues = cell.possibleValues.filter(
            (v) => v !== info.value
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
    boxes.forEach((box) => {
      const possibleDoubles: Cell[] = [];
      box.forEach((c) => {
        if (c.assignedValue) return;
        if (c.possibleValues.length !== 2) return;
        const [value1, value2] = c.possibleValues;
        const rowCells = box.filter((cell) => cell.row === c.row);
        const rowCellsWithSameValue = rowCells.filter((cell) => {
          if (cell.assignedValue) return false;
          if (cell.possibleValues.length !== 2) return false;
          return (
            cell.possibleValues.includes(value1) &&
            cell.possibleValues.includes(value2)
          );
        });
        if (rowCellsWithSameValue.length > 1) {
          const other1 = rowCellsWithSameValue[0];
          const otherCell = rowCellsWithSameValue[1];
          doubleRows.push({
            row: c.row,
            cell1: other1,
            cell2: otherCell,
            value: value1,
            value2: value2,
          });
        }
      });
    });
    return doubleRows;
  }
}
type DoubleRowInfo = {
  row: number;
  cell1: Cell;
  cell2: Cell;
  value: string;
  value2: string;
};

import {
  Cell,
  SolveMethodTemplate,
  SudokuGrid,
} from "../../solvers/SolverTemplate";
import { BoxWidthMap } from "../helpers";
import { getBox, getGridBoxes } from "../utils";

export class NakedDouble implements SolveMethodTemplate {
  possibleValues: string[];
  constructor(possibleValues: string[]) {
    this.possibleValues = possibleValues;
  }
  findAll(grid: SudokuGrid): SudokuGrid {
    for (let i = 0; i < 10; i++) {
      this.findOne(grid);
    }
    return grid;
  }

  findOne(grid: SudokuGrid): SudokuGrid | null {
    // find in box all values in the same row or column.
    // NakedPair: Two candidates are same in two cells in a row, column or box
    const boxes: Cell[][] = getGridBoxes(grid);

    const doubleRows: DoubleRowInfo[] = this.findDoubleRowInfo(boxes);
    // console.log(doubleRows);
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.assignedValue) return;
        doubleRows.forEach((info) => {
          if (info.cell1.row !== cell.row) return;
          if (this.inSameBox(info.cell1, cell)) return;
          if (this.inSameBox(info.cell2, cell)) return;
          // if (info.cell1.col === cell.col) return;
          // if (info.cell2.col === cell.col) return;
          if (cell.possibleValues.length === 1)
            cell.assignedValue = cell.possibleValues[0];
          // console.log(info.cell1, info.cell2, cell);
          cell.possibleValues = cell.possibleValues.filter((v) => {
            if (v === info.value) {
              console.log(
                "Removing",
                v,
                "from",
                "(",
                cell.row.toString(),
                cell.col.toString(),
                ")",
                "because of",
                info
              );
            }
            return v !== info.value;
          });
        });
      });
    });
    // const doubleCols: DoubleColInfo[] = this.findDoubleColInfo(boxes);
    // // console.log(doubleCols);
    // grid.forEach((row) => {
    //   row.forEach((cell) => {
    //     if (cell.assignedValue) return;
    //     doubleCols.forEach((info) => {
    //       if (info.cell1.col !== cell.col) return;
    //       if (info.cell1.row === cell.row) return;
    //       if (info.cell2.row === cell.row) return;
    //       if (cell.possibleValues.length === 1)
    //         cell.assignedValue = cell.possibleValues[0];
    //       cell.possibleValues = cell.possibleValues.filter((v) => {

    //         return v !== info.value;
    //       });
    //     });
    //   });
    // });

    return grid;
  }

  inSameBox(cell1: Cell, cell2: Cell): boolean {
    const boxWidth = BoxWidthMap[this.possibleValues.length];
    const boxRowValue = (cell: Cell) => {
      return Math.floor(cell.row / boxWidth);
    };
    const boxColValue = (cell: Cell) => {
      return Math.floor(cell.col / boxWidth);
    };
    return (
      boxRowValue(cell1) === boxRowValue(cell2) &&
      boxColValue(cell1) === boxColValue(cell2)
    );
  }

  findDoubleRowInfo(boxes: Cell[][]): DoubleRowInfo[] {
    const doubleRows: DoubleRowInfo[] = [];
    boxes.forEach((box) => {
      const possibles = [...this.possibleValues];
      const possibleCount: (number | null | undefined)[] = new Array(
        this.possibleValues.length
      ).fill(undefined);
      box.forEach((c) => {
        if (c.assignedValue) return;
        possibleCount.forEach((count, i) => {
          if (possibleCount[i] === null) return;
          if (c.possibleValues.includes(possibles[i])) {
            if (possibleCount[i] === undefined) possibleCount[i] = c.row;
            if (possibleCount[i] !== c.row) possibleCount[i] = null;
          }
        });
      });
      possibleCount.forEach((count, i) => {
        if (count === null || count === undefined) return;
        const row = count;
        const rowCells = box.filter((cell) => cell.row === row);
        const rowCellsWithSameValue = rowCells.filter((cell) => {
          if (cell.assignedValue) return false;
          return cell.possibleValues.includes(possibles[i]);
        });
        if (rowCellsWithSameValue.length > 1) {
          const other1 = rowCellsWithSameValue[0];
          const otherCell = rowCellsWithSameValue[1];
          doubleRows.push({
            row: row,
            cell1: other1,
            cell2: otherCell,
            value: possibles[i],
          });
        }
      });
    });
    return doubleRows;
  }

  findDoubleColInfo(boxes: Cell[][]): DoubleColInfo[] {
    const doubleCols: DoubleColInfo[] = [];
    boxes.forEach((box) => {
      const possibles = [...this.possibleValues];
      const possibleCount: (number | null | undefined)[] = new Array(
        this.possibleValues.length
      ).fill(undefined);
      box.forEach((c) => {
        if (c.assignedValue) return;
        possibleCount.forEach((count, i) => {
          if (possibleCount[i] === null) return;
          if (c.possibleValues.includes(possibles[i])) {
            if (possibleCount[i] === undefined) possibleCount[i] = c.col;
            if (possibleCount[i] !== c.col) possibleCount[i] = null;
          }
        });
      });
      possibleCount.forEach((count, i) => {
        if (count === null || count === undefined) return;
        const col = count;
        const colCells = box.filter((cell) => cell.col === col);
        const colCellsWithSameValue = colCells.filter((cell) => {
          if (cell.assignedValue) return false;
          return cell.possibleValues.includes(possibles[i]);
        });
        if (colCellsWithSameValue.length > 1) {
          const other1 = colCellsWithSameValue[0];
          const otherCell = colCellsWithSameValue[1];
          doubleCols.push({
            col: col,
            cell1: other1,
            cell2: otherCell,
            value: possibles[i],
          });
        }
      });
    });
    return doubleCols;
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
}
type DoubleRowInfo = {
  row: number;
  cell1: Cell;
  cell2: Cell;
  value: string;
};
type DoubleColInfo = {
  col: number;
  cell1: Cell;
  cell2: Cell;
  value: string;
};

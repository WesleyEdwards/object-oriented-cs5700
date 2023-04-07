import { Cell, SudokuGrid } from "./SolverTemplate";
import { BoxWidthMap } from "./helpers";

export function getBox(grid: SudokuGrid, cell: Cell): Cell[] {
  const { row, col } = cell;
  const size = BoxWidthMap[grid.length];
  const box: Cell[] = [];
  const boxRowStart = Math.floor(row / size) * size;
  const boxColStart = Math.floor(col / size) * size;
  for (let i = boxRowStart; i < boxRowStart + size; i++) {
    for (let j = boxColStart; j < boxColStart + size; j++) {
      box.push(grid[i][j]);
    }
  }

  return box;
}

export function getGridBoxes(grid: SudokuGrid): Cell[][] {
  const size = BoxWidthMap[grid.length];
  const boxes: Cell[][] = [];
  for (let i = 0; i < grid.length; i += size) {
    for (let j = 0; j < grid.length; j += size) {
      const box: Cell[] = [];
      for (let k = i; k < i + size; k++) {
        for (let l = j; l < j + size; l++) {
          box.push(grid[k][l]);
        }
      }
      boxes.push(box);
    }
  }
  return boxes;
}

export function getNonBoxCellsInRow(
  grid: SudokuGrid,
  row: number,
  col: number
): Cell[] {
  const size = BoxWidthMap[grid.length];
  const boxRowStart = Math.floor(row / size) * size;
  const boxColStart = Math.floor(col / size) * size;
  const cells: Cell[] = [];
  for (let i = 0; i < grid.length; i++) {
    if (i >= boxColStart && i < boxColStart + size) {
      continue;
    }
    cells.push(grid[row][i]);
  }
  return cells;
}

export function getNonBoxCellsInCol(
  grid: SudokuGrid,
  row: number,
  col: number
): Cell[] {
  const size = BoxWidthMap[grid.length];
  const boxRowStart = Math.floor(row / size) * size;
  const boxColStart = Math.floor(col / size) * size;
  const cells: Cell[] = [];
  for (let i = 0; i < grid.length; i++) {
    if (i >= boxRowStart && i < boxRowStart + size) {
      continue;
    }
    cells.push(grid[i][col]);
  }
  return cells;
}

export const turnToText = (grid: SudokuGrid): string => {
  let text = "";
  grid.forEach((row) => {
    row.forEach((cell) => {
      text += cell.assignedValue + " ";
    });
    text += "\n";
  });
  return text;
};

export const value: string = "0";

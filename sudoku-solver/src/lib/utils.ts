import { Cell, SudokuGrid } from "../solvers/SolverTemplate";
import { BoxWidthMap } from "./helpers";

export function getBox(grid: SudokuGrid, row: number, col: number): Cell[] {
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

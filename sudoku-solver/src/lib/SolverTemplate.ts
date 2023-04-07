export type Cell = {
  assignedValue: string | undefined;
  possibleValues: string[];
  row: number;
  col: number;
};

export type SudokuGrid = Cell[][];

export interface Puzzle {
  fileName: string;
  dimensions: number;
  originalGrid: SudokuGrid;
  workingGrid: SudokuGrid;
  possibleValues: string[];
}

export interface CellSolution {
  findAll(grid: SudokuGrid): SudokuGrid | null;
  findOne(grid?: SudokuGrid): SudokuGrid | null;
  checkRow(cell: Cell, value: string): boolean;
  checkCol(cell: Cell, value: string): boolean;
  checkBox(cell: Cell, value: string): boolean;
}

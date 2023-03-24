export interface SolverTemplate {
  solve(): Puzzle | null;
  solveSection(): void;
}

export type Cell = {
  originalValue: string | undefined;
  assignedValue: string | undefined;
  testValue: string | undefined;
};
export type SudokuGrid = Cell[][];

export interface Puzzle {
  fileName: string;
  dimensions: number;
  sudokuGrid: SudokuGrid;
}

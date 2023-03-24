export interface SudokuTemplate {
  solve(): void;
  solveSection(): void;
}

export interface Puzzle {
  fileName: string;
  dimensions: number;
  puzzle: string[][];
}

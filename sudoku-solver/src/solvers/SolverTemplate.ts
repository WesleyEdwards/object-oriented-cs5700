import { BoxWidthMap } from "../lib/helpers";

export type Cell = {
  originalValue: string | undefined;
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

export interface SolveMethodTemplate {
  findAll(): SudokuGrid;
  findOne(): SudokuGrid | null;
  checkRow(): void;
  checkCol(): void;
  checkBox(): void;
}

// Naked Single
// Hidden Single
// Naked Pair
// Hidden Pair

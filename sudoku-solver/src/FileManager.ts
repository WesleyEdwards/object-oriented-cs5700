import { ChangeEvent } from "react";
import { Puzzle, SudokuGrid } from "./solvers/SolverTemplate";

export class FileManager {
  parsePuzzle(event: ChangeEvent<HTMLInputElement>): Promise<Puzzle> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (!e.target || !event.target.files) {
          reject("Invalid event or file");
          return;
        }
        const rows: string[] = (e.target.result as string).split("\n");

        const newRows = rows.map((row) => row.replace(/[\r\n]/g, ""));

        const firstRow = newRows.shift()!;

        const rowLength = parseInt(firstRow);

        if (![4, 9, 16, 25, 36].includes(rowLength)) {
          reject("Invalid puzzle");
          return;
        }

        const possibleValues = newRows[0].split(" ");
        newRows.shift();

        newRows.length = rowLength;

        const sudoku: string[][] = newRows.map((row) => row.split(" "));

        const sudokuGrid: SudokuGrid = sudoku.map((row, rowIdx) => {
          return row.map((cell, colIdx) => ({
            possibleValues: [],
            originalValue: cell === "-" ? undefined : cell,
            assignedValue: cell === "-" ? undefined : cell,
            row: rowIdx,
            col: colIdx,
          }));
        });

        const formattedSudoku: Puzzle = {
          dimensions: parseInt(firstRow),
          fileName: event.target.files[0].name,
          workingGrid: sudokuGrid,
          originalGrid: sudokuGrid,
          possibleValues,
        };
        resolve(formattedSudoku);
      };
      reader.onerror = (e) => {
        reject(e);
      };
      if (event.target.files) {
        reader.readAsText(event.target.files[0]);
      }
    });
  }
}
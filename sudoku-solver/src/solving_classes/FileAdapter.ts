import { ChangeEvent } from "react";
import { validWidths } from "../lib/helpers";
import { Puzzle, SudokuGrid } from "./SolverTemplate";

export class FileAdapter {
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

        if (isNaN(rowLength)) return reject("Invalid puzzle Length");

        if (!validWidths.includes(rowLength))
          return reject("Invalid puzzle size");

        const possibleValues = newRows[0].split(" ");
        newRows.shift();

        newRows.length = rowLength;

        const sudoku: string[][] = newRows.map((row) => row.split(" "));

        const sudokuGrid: SudokuGrid = sudoku.map((row, rowIdx) =>
          row.map((cell, colIdx) => ({
            possibleValues: [],
            assignedValue: cell === "-" ? undefined : cell,
            row: rowIdx,
            col: colIdx,
          }))
        );

        const formattedSudoku: Puzzle = {
          dimensions: parseInt(firstRow),
          fileName: event.target.files[0].name,
          workingGrid: sudokuGrid,
          originalGrid: sudokuGrid,
          possibleValues,
        };

        const valid = formattedSudoku.workingGrid.every((row) =>
          row.every((cell) => {
            if (cell.assignedValue === undefined) return true;
            return formattedSudoku.possibleValues.includes(cell.assignedValue);
          })
        );

        if (!valid) return reject("Sudoku is invalid.");

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

  downloadFile(fileData: string, fileName: string) {
    const blob = new Blob([fileData], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = fileName;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }
}

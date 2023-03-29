import { Cell, Puzzle, SudokuGrid } from "./solvers/SolverTemplate";

export const cellPixelSize: Record<number, number> = {
  4: 40,
  9: 40,
  16: 25,
  25: 25,
  36: 20,
};

export const BoxWidthMap: Record<number, number> = {
  4: 2,
  9: 3,
  16: 4,
  25: 5,
  36: 6,
};

const emptyCell: Omit<Cell, "row" | "col"> = {
  originalValue: undefined,
  assignedValue: undefined,
  possibleValues: [],
};

export function parsePuzzle(
  event: React.ChangeEvent<HTMLInputElement>
): Promise<Puzzle> {
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

      newRows.length = rowLength;

      const sudoku: string[][] = newRows.map((row) => row.split(" "));

      const sudokuGrid: SudokuGrid = sudoku.map((row, rowIdx) => {
        return row.map((cell, colIdx) => {
          return cell === "-"
            ? {
                ...emptyCell,
                originalValue: undefined,
                row: rowIdx,
                col: colIdx,
              }
            : {
                ...emptyCell,
                originalValue: cell,
                assignedValue: cell,
                row: rowIdx,
                col: colIdx,
              };
        });
      });

      const formattedSudoku: Puzzle = {
        dimensions: parseInt(firstRow),
        fileName: event.target.files[0].name,
        sudokuGrid,
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

export function findPossibilities(sudoku: Puzzle): Puzzle {
  const sudokuGrid = sudoku.sudokuGrid.map((row) =>
    row.map((cell) => findPossibleValues(cell, sudoku.sudokuGrid))
  );
  return {
    ...sudoku,
    sudokuGrid,
  };
}

function findPossibleValues(cell: Cell, grid: SudokuGrid): Cell {
  if (cell.originalValue) return cell;
  cell.possibleValues = [];
  for (let i = 1; i <= grid.length; i++) {
    if (isNumberValid(grid, cell, i)) {
      cell.possibleValues.push(i.toString());
    }
  }
  return cell;
}

function isNumberValid(grid: SudokuGrid, cell: Cell, num: number) {
  const { row, col } = cell;
  const sudokuRow: Cell[] = grid[row];
  const sudokuCol: Cell[] = grid.map((row) => row[col]);
  const sudokuBox: Cell[] = getBox(grid, row, col);

  const rowColBox = [...sudokuRow, ...sudokuCol, ...sudokuBox];
  const used: string[] = [];

  rowColBox.forEach((cell) => {
    if (cell.originalValue && !used.includes(cell.originalValue)) {
      used.push(cell.originalValue);
    }
  });

  return !used.includes(num.toString());
}

function getBox(grid: SudokuGrid, row: number, col: number): Cell[] {
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

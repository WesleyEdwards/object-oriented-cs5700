import { Puzzle } from "./solver";

export const cellPixelSize: Record<number, number> = {
  4: 40,
  9: 40,
  16: 25,
  25: 25,
  36: 20,
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

      const formattedSudoku: Puzzle = {
        dimensions: parseInt(firstRow),
        fileName: event.target.files[0].name,
        puzzle: sudoku,
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

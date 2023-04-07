import { describe, expect, it } from "vitest";
import { FindInitialPossibilities } from "./FindInitialPossibilities";

const assignedValue = undefined;
const possibleValues = ["1", "2", "3", "4"];

const testGrid = [
  [
    { assignedValue: "1", possibleValues: [], row: 0, col: 0 },
    { assignedValue: "2", possibleValues: [], row: 0, col: 1 },
    { assignedValue: "3", possibleValues: [], row: 0, col: 2 },
    { assignedValue, possibleValues: [], row: 0, col: 3 },
  ],
  [
    { assignedValue, possibleValues: [], row: 1, col: 0 },
    { assignedValue, possibleValues: [], row: 1, col: 1 },
    { assignedValue, possibleValues: [], row: 1, col: 2 },
    { assignedValue, possibleValues: [], row: 1, col: 3 },
  ],
  [
    { assignedValue, possibleValues: [], row: 2, col: 0 },
    { assignedValue, possibleValues: [], row: 2, col: 1 },
    { assignedValue, possibleValues: [], row: 2, col: 2 },
    { assignedValue, possibleValues: [], row: 2, col: 3 },
  ],
  [
    { assignedValue, possibleValues: [], row: 3, col: 0 },
    { assignedValue, possibleValues: [], row: 3, col: 1 },
    { assignedValue, possibleValues: [], row: 3, col: 2 },
    { assignedValue, possibleValues: [], row: 3, col: 3 },
  ],
];

describe("FindInitialPossibilities", () => {
  describe("findAll", () => {
    it("should remove assigned values from possible values of other cells in the same row", () => {
      const findPossibles = new FindInitialPossibilities(possibleValues);
      const possibles = findPossibles.findAll(testGrid);

      expect(possibles).toBeTruthy();
      expect(possibles[0][0].possibleValues).not.toContain("1");
      expect(possibles[0][1].possibleValues).not.toContain("2");
      expect(possibles[0][2].possibleValues).not.toContain("3");
    });

    it("should add unassigned values to possible values of cells in the same row, column, and box", () => {
      const findPossibles = new FindInitialPossibilities(possibleValues);
      const possibles = findPossibles.findAll(testGrid);

      expect(possibles).toBeTruthy();
      expect(possibles[0][3].possibleValues).toContain("4");
      expect(possibles[0][3].possibleValues).not.toContain("3");
      expect(possibles[3][3].possibleValues).toContain("1");
    });
  });
});

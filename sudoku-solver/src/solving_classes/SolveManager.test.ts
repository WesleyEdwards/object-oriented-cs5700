import { describe, expect, it } from "vitest";
import { SolveManager } from "./SolveManager";

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
    { assignedValue: "2", possibleValues: [], row: 1, col: 0 },
    { assignedValue: "3", possibleValues: [], row: 1, col: 1 },
    { assignedValue: "4", possibleValues: [], row: 1, col: 2 },
    { assignedValue, possibleValues: [], row: 1, col: 3 },
  ],
  [
    { assignedValue: "3", possibleValues: [], row: 2, col: 0 },
    { assignedValue: "4", possibleValues: [], row: 2, col: 1 },
    { assignedValue: "1", possibleValues: [], row: 2, col: 2 },
    { assignedValue, possibleValues: [], row: 2, col: 3 },
  ],
  [
    { assignedValue, possibleValues: [], row: 3, col: 0 },
    { assignedValue, possibleValues: [], row: 3, col: 1 },
    { assignedValue, possibleValues: [], row: 3, col: 2 },
    { assignedValue, possibleValues: [], row: 3, col: 3 },
  ],
];
const expectedResults = [
  [
    { assignedValue: "1", possibleValues: [], row: 0, col: 0 },
    { assignedValue: "2", possibleValues: [], row: 0, col: 1 },
    { assignedValue: "3", possibleValues: [], row: 0, col: 2 },
    { assignedValue: "4", possibleValues: [], row: 0, col: 3 },
  ],
  [
    { assignedValue: "2", possibleValues: [], row: 1, col: 0 },
    { assignedValue: "3", possibleValues: [], row: 1, col: 1 },
    { assignedValue: "4", possibleValues: [], row: 1, col: 2 },
    { assignedValue: "1", possibleValues: [], row: 1, col: 3 },
  ],
  [
    { assignedValue: "3", possibleValues: [], row: 2, col: 0 },
    { assignedValue: "4", possibleValues: [], row: 2, col: 1 },
    { assignedValue: "1", possibleValues: [], row: 2, col: 2 },
    { assignedValue: "2", possibleValues: [], row: 2, col: 3 },
  ],
  [
    { assignedValue: "4", possibleValues: [], row: 3, col: 0 },
    { assignedValue: "1", possibleValues: [], row: 3, col: 1 },
    { assignedValue: "2", possibleValues: [], row: 3, col: 2 },
    { assignedValue: "3", possibleValues: [], row: 3, col: 3 },
  ],
];

describe("FindInitialPossibilities", () => {
  describe("findAll", () => {
    it("Should solve all the puzzle", () => {
      const solve = new SolveManager(testGrid, possibleValues);
      const solved = { ...solve.solveAll() };

      // Make sure there are no possibilities lying around
      for (let i = 0; i < solved.length; i++) {
        for (let j = 0; j < solved[i].length; j++) {
          expect(solved[i][j].possibleValues.length).toBe(0);
        }
      }

      // Make sure the solved puzzle is correct
      for (let i = 0; i < solved.length; i++) {
        for (let j = 0; j < solved[i].length; j++) {
          expect(solved[i][j].assignedValue).toBe(
            expectedResults[i][j].assignedValue
          );
        }
      }
    });
  });
});

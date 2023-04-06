import { describe, expect, it } from "vitest";
import { HiddenSingle } from "./HiddenSingle";
import { SudokuGrid } from "../solving_classes/SolverTemplate";

const possibleValues = ["5"];
const assignedValue = undefined;

const testGrid: SudokuGrid = [
  [
    { assignedValue, possibleValues: ["1", "2", "3", "4"], row: 0, col: 0 },
    { assignedValue, possibleValues: ["2"], row: 0, col: 1 },
    { assignedValue, possibleValues: ["3"], row: 0, col: 2 },
    { assignedValue, possibleValues: ["4"], row: 0, col: 3 },
  ],
  [
    { assignedValue, possibleValues, row: 1, col: 0 },
    { assignedValue, possibleValues, row: 1, col: 1 },
    { assignedValue, possibleValues, row: 1, col: 2 },
    { assignedValue: "1", possibleValues, row: 1, col: 3 },
  ],
  [
    { assignedValue, possibleValues, row: 2, col: 0 },
    { assignedValue: "1", possibleValues, row: 2, col: 1 },
    { assignedValue, possibleValues, row: 2, col: 2 },
    { assignedValue, possibleValues, row: 2, col: 3 },
  ],
  [
    { assignedValue, possibleValues, row: 3, col: 0 },
    { assignedValue, possibleValues: ["5"], row: 3, col: 1 }, // This should not be made the assigned value
    { assignedValue: "5", possibleValues, row: 3, col: 2 },
    { assignedValue, possibleValues, row: 3, col: 3 },
  ],
];

describe("HiddenSingle", () => {
  const candidate = new HiddenSingle();
  const findCandidate = candidate.findAll(testGrid);

  it("should All the hidden singles in the grid", () => {
    expect(findCandidate).toBeTruthy();
    if (findCandidate) {
      expect(findCandidate[0][0].assignedValue).toBe("1");
      expect(findCandidate[0][1].assignedValue).toBe("2");
      expect(findCandidate[0][2].assignedValue).toBe("3");
      expect(findCandidate[0][3].assignedValue).toBe("4");

      expect(findCandidate[1][0].assignedValue).toBe(undefined);
      expect(findCandidate[1][1].assignedValue).toBe(undefined);
      expect(findCandidate[1][2].assignedValue).toBe(undefined);
      expect(findCandidate[1][3].assignedValue).toBe("1");

      expect(findCandidate[3][1].assignedValue).toBe(undefined);
    }
  });
});

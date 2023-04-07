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

describe("SoleCandidate", () => {
  const findPossibles = new FindInitialPossibilities(possibleValues);
  const possibles = findPossibles.findAll(testGrid);

  it("should find a sole candidate", () => {
    expect(possibles).toBeTruthy();
    if (possibles) {
      // Make sure the assigned values are not in the possible values
      expect(possibles[0][0].possibleValues).not.toContain("1");
      expect(possibles[0][1].possibleValues).not.toContain("2");
      expect(possibles[0][2].possibleValues).not.toContain("3");

      // Make sure the unassigned values are in the possible values
      expect(possibles[0][3].possibleValues).toContain("4");
      expect(possibles[0][3].possibleValues).not.toContain("3");

      // Make sure the unassigned values are in the possible values
      expect(possibles[3][3].possibleValues).toContain("1");
      expect(possibles[3][3].possibleValues).toContain("2");
      expect(possibles[3][3].possibleValues).toContain("3");
      expect(possibles[3][3].possibleValues).toContain("4");
    }
  });
});

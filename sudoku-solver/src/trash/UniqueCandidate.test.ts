import { describe, expect, it } from "vitest";
import { UniqueCandidate } from "./UniqueCandidate";

const possibleValues = ["1", "2", "3", "4"];
const assignedValue = undefined;

const testGrid = [
  [
    { assignedValue, possibleValues: ["1"], row: 0, col: 0 },
    { assignedValue, possibleValues: ["2"], row: 0, col: 1 },
    { assignedValue, possibleValues: ["3"], row: 0, col: 2 },
    { assignedValue, possibleValues: ["4"], row: 0, col: 3 },
  ],
  [
    { assignedValue, possibleValues, row: 1, col: 0 },
    { assignedValue, possibleValues, row: 1, col: 1 },
    { assignedValue, possibleValues, row: 1, col: 2 },
    { assignedValue, possibleValues, row: 1, col: 3 },
  ],
  [
    { assignedValue, possibleValues, row: 2, col: 0 },
    { assignedValue, possibleValues, row: 2, col: 1 },
    { assignedValue, possibleValues, row: 2, col: 2 },
    { assignedValue, possibleValues, row: 2, col: 3 },
  ],
  [
    { assignedValue, possibleValues, row: 3, col: 0 },
    { assignedValue, possibleValues, row: 3, col: 1 },
    { assignedValue, possibleValues, row: 3, col: 2 },
    { assignedValue, possibleValues, row: 3, col: 3 },
  ],
];

describe("UniqueCandidate", () => {
  const candidate = new UniqueCandidate(testGrid, possibleValues);
  const findCandidate = candidate.findOne();

  it("should find a unique candidate", () => {
    expect(findCandidate).toBeTruthy();
    if (findCandidate) {
      expect(findCandidate[0][0].assignedValue).toBe("1");

      expect(findCandidate[1][0].assignedValue).toBe(undefined);
      expect(findCandidate[1][1].assignedValue).toBe(undefined);
      expect(findCandidate[1][2].assignedValue).toBe(undefined);
      expect(findCandidate[1][3].assignedValue).toBe(undefined);
    }
  });
});

import { describe, expect, it } from "vitest";
import { SoleCandidate } from "./SoleCandidate";

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
    { assignedValue, possibleValues: ["5", "6"], row: 1, col: 0 },
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

describe("SoleCandidate", () => {
  const candidate = new SoleCandidate();
  const findCandidate = candidate.findAll(testGrid);

  it("should find a sole candidate", () => {
    expect(findCandidate).toBeTruthy();
    if (findCandidate) {
      expect(findCandidate[0][0].assignedValue).toBe("1");
      expect(findCandidate[0][1].assignedValue).toBe("2");
      expect(findCandidate[0][2].assignedValue).toBe("3");
      expect(findCandidate[0][3].assignedValue).toBe("4");

      expect(findCandidate[1][0].assignedValue).toBe(undefined);
      expect(findCandidate[1][1].assignedValue).toBe(undefined);
      expect(findCandidate[1][2].assignedValue).toBe(undefined);
      expect(findCandidate[1][3].assignedValue).toBe(undefined);
    }
  });
});

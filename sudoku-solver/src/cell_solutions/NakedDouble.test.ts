import { describe, expect, it } from "vitest";
import { SoleCandidate } from "./SoleCandidate";
import { NakedDouble } from "./NakedDouble";

const possibleValues = ["1", "2", "3", "4"];
const assignedValue = undefined;

const testGrid = [
  [
    { assignedValue, possibleValues: ["1", "2"], row: 0, col: 0 },
    { assignedValue, possibleValues: ["1", "3"], row: 0, col: 1 },
    { assignedValue: "3", possibleValues: [], row: 0, col: 2 },
    { assignedValue: "4", possibleValues: [], row: 0, col: 3 },
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

describe("SoleCandidate", () => {
  const nakedDouble = new NakedDouble(possibleValues);
  const findDoubles = nakedDouble.findAll(testGrid);

  it("should find a sole candidate", () => {
    expect(findDoubles).toBeTruthy();
    if (findDoubles) {
      expect(findDoubles[0][0].possibleValues).toContain("1");
      expect(findDoubles[0][1].possibleValues).toContain("1");

      //   expect(findDoubles[0][2].possibleValues).toContain("3");
      expect(findDoubles[0][2].possibleValues).not.toContain("1");
      expect(findDoubles[0][2].possibleValues).not.toContain("2");
      expect(findDoubles[0][3].possibleValues).not.toContain(["1"]);
      expect(findDoubles[0][3].possibleValues).not.toContain(["2"]);

      expect(findDoubles[1][0].assignedValue).toBe("4");
      expect(findDoubles[1][1].assignedValue).toBe("4");
      expect(findDoubles[1][2].assignedValue).toBe(undefined);
      expect(findDoubles[1][3].assignedValue).toBe(undefined);
    }
  });
});

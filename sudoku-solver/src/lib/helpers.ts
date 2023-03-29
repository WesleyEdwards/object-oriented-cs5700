import { Cell } from "../solvers/SolverTemplate";

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

export const emptyCell: Omit<Cell, "row" | "col"> = {
  originalValue: undefined,
  assignedValue: undefined,
  possibleValues: [],
};

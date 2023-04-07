import { describe, expect, it } from "vitest";
import { reducer, State, Action } from "./StateManager";
import { Puzzle, SudokuGrid } from "./SolverTemplate";

describe("reducer", () => {
  const initialScreen: State = { status: "initialScreen" };
  const solving: State = { status: "solving", puzzle: {} as Puzzle };
  const solved: State = { status: "solved", puzzle: {} as Puzzle };
  const error: State = { status: "error", message: "Some error message" };

  it("should return the current state if attempting to remove an error while not in an error state", () => {
    const newState = reducer(solving, { action: "removeError" });
    expect(newState).toEqual(solving);
  });

  it("should transition to the initial screen state when removing an error from an error state", () => {
    const newState = reducer(error, { action: "removeError" });
    expect(newState).toEqual(initialScreen);
  });

  it("should transition to the solving state when given a 'setSolving' action with a puzzle", () => {
    const puzzle = {} as Puzzle;
    const newState = reducer(initialScreen, { action: "setSolving", puzzle });
    expect(newState).toEqual({ status: "solving", puzzle });
  });

  it("should transition to the solved state when given a 'setSolved' action in the solving state", () => {
    const newState = reducer(solving, { action: "setSolved" });
    expect(newState).toEqual(solved);
  });

  it("should not transition to the solved state when given a 'setSolved' action outside the solving state", () => {
    const newState = reducer(initialScreen, { action: "setSolved" });
    expect(newState).toEqual(initialScreen);
  });

  it("should transition to the error state when given an 'setError' action with a message", () => {
    const message = "Some error message";
    const newState = reducer(initialScreen, { action: "setError", message });
    expect(newState).toEqual({ status: "error", message });
  });

  it("should transition to the initial screen state when given an 'initialScreen' action", () => {
    const newState = reducer(solving, { action: "initialScreen" });
    expect(newState).toEqual(initialScreen);
  });

  it("should not update the puzzle if not in the solving state", () => {
    const oldPuzzle = {} as Puzzle;
    const newGrid = {} as SudokuGrid;
    const newState = reducer(initialScreen, {
      action: "updateSudoku",
      payload: newGrid,
    });
    expect(newState).toEqual(initialScreen);
  });
});

import { Puzzle, SudokuGrid } from "../solvers/SolverTemplate";

export type State =
  | { status: "initialScreen" }
  | { status: "solving"; puzzle: Puzzle }
  | { status: "solved"; puzzle: Puzzle }
  | { status: "error"; message: string };

export type Action =
  | { action: "setSolved" }
  | { action: "setSolving"; puzzle: Puzzle }
  | { action: "removeError" }
  | { action: "updateSudoku"; payload: SudokuGrid }
  | { action: "setError"; message: string }
  | { action: "initialScreen" };

export function reducer(state: State, action: Action): State {
  switch (action.action) {
    case "removeError":
      if (state.status !== "error") return state;
      return { status: "initialScreen" };
    case "setSolved":
      if (state.status !== "solving") return state;
      return { status: "solved", puzzle: state.puzzle };
    case "setSolving":
      return { status: "solving", puzzle: action.puzzle };
    case "setError":
      return { status: "error", message: action.message };
    case "initialScreen":
      return { status: "initialScreen" };
    case "updateSudoku":
      if (state.status !== "solving") return state;
      return {
        status: "solving",
        puzzle: {
          ...state.puzzle,
          workingGrid: action.payload,
        },
      };
  }
}

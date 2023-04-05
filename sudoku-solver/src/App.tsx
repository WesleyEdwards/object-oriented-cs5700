import { Alert, Container, Divider, Stack, Typography } from "@mui/material";
import { useReducer, useState } from "react";
import { PuzzleView } from "./components/PuzzleView";
import { SolvePuzzle } from "./components/SolvePuzzle";
import { UploadFile } from "./components/UploadFile";
import { reducer } from "./lib/StateManager";
import { Puzzle, SudokuGrid } from "./solvers/SolverTemplate";
import { DoneSolving } from "./components/DoneSolving";
import { FileAdapter } from "./FileAdapter";

export type GridStatus = SudokuGrid | "unsolvable" | "solved";

function App() {
  const [state, dispatch] = useReducer(reducer, { status: "initialScreen" });

  const sudokuAdapter = new FileAdapter();

  const setNewSudoku = (working: GridStatus) => {
    if (working === "unsolvable") {
      return dispatch({ action: "setError", message: "This cannot be solved" });
    }
    if (working === "solved") {
      return dispatch({ action: "setSolved" });
    }
    dispatch({ action: "updateSudoku", payload: working });
  };

  const setInitialSudoku = (initial: Puzzle | undefined) => {
    if (initial) return dispatch({ action: "setSolving", puzzle: initial });
    dispatch({ action: "initialScreen" });
  };

  const handleDownload = (fileData: string, fileName: string) => {
    sudokuAdapter.downloadFile(fileData, fileName);
  };

  return (
    <Container maxWidth="lg" sx={{ py: "4rem" }}>
      <Stack spacing="2rem">
        <Typography variant="h1" textAlign="center">
          Sudoku Solver
        </Typography>
        <Divider />
        <UploadFile
          sudoku={"puzzle" in state ? state.puzzle : undefined}
          setSudoku={setInitialSudoku}
          setError={(err) => dispatch({ action: "setError", message: err })}
          adapter={sudokuAdapter}
        />
        {(() => {
          if (state.status === "error")
            return <Alert severity="error">{state.message}</Alert>;
          if (state.status === "solving" || state.status === "solved") {
            const { workingGrid, possibleValues } = state.puzzle;
            return (
              <>
                <PuzzleView
                  grid={state.puzzle.workingGrid}
                  dimensions={state.puzzle.dimensions}
                />
                <Divider />
                {state.status === "solved" ? (
                  <DoneSolving
                    puzzle={state.puzzle}
                    download={handleDownload}
                  />
                ) : (
                  <SolvePuzzle
                    workingGrid={workingGrid}
                    possibleValues={possibleValues}
                    setGrid={setNewSudoku}
                  />
                )}
              </>
            );
          }
        })()}
      </Stack>
    </Container>
  );
}

export default App;

import { Container, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { PuzzleView } from "./components/PuzzleView";
import { SolvePuzzle } from "./components/SolvePuzzle";
import { UploadFile } from "./components/UploadFile";
import { Puzzle, SudokuGrid } from "./solvers/SolverTemplate";

export type GridStatus = SudokuGrid | "unsolvable" | "solved";

function App() {
  const [sudoku, setSudoku] = useState<Puzzle>();
  const [error, setError] = useState<string>();
  const [done, setDone] = useState<boolean>(false);

  const setNewSudoku = (working: GridStatus) => {
    setDone(false);
    if (sudoku === undefined) return;
    if (working === "unsolvable") return setError("No solution found");
    if (working === "solved") return setDone(true);
    setSudoku({
      ...sudoku,
      workingGrid: working,
    });
  };

  const setInitialSudoku = (initial: Puzzle | undefined) => {
    setSudoku(initial);
    setDone(false);
    setError(undefined);
  };

  return (
    <Container maxWidth="lg" sx={{ py: "4rem" }}>
      <Stack spacing="2rem">
        <Typography variant="h1" textAlign="center">
          Sudoku Solver
        </Typography>
        <Divider />
        <UploadFile sudoku={sudoku} setSudoku={setInitialSudoku} />
        {(() => {
          if (sudoku) {
            const { workingGrid } = sudoku;
            return (
              <>
                <PuzzleView
                  grid={sudoku.workingGrid}
                  dimensions={sudoku.dimensions}
                />
                <Divider />
                {done ? (
                  <div>done</div>
                ) : (
                  <SolvePuzzle
                    workingGrid={workingGrid}
                    possibleValues={sudoku.possibleValues}
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

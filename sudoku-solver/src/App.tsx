import { Alert, Container, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PuzzleView } from "./components/PuzzleView";
import { SolvePuzzle } from "./components/SolvePuzzle";
import { UploadFile } from "./components/UploadFile";
import { Puzzle, SudokuGrid } from "./solvers/SolverTemplate";

function App() {
  const [sudoku, setSudoku] = useState<Puzzle>();
  const [error, setError] = useState<string>();

  const setNewSudoku = (working: SudokuGrid | null) => {
    if (working === null) return setError("No solution found");
    if (sudoku === undefined) return;
    setSudoku({
      ...sudoku,
      workingGrid: working,
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: "4rem" }}>
      <Stack spacing="2rem">
        <Typography variant="h1" textAlign="center">
          Sudoku Solver
        </Typography>
        <Divider />
        <UploadFile sudoku={sudoku} setSudoku={setSudoku} />
        {sudoku && (
          <>
            <PuzzleView
              grid={sudoku.workingGrid}
              dimensions={sudoku.dimensions}
            />
            <Divider />
            <SolvePuzzle sudoku={sudoku} setSolved={setNewSudoku} />
          </>
        )}
      </Stack>
    </Container>
  );
}

export default App;

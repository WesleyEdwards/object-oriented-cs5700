import { Alert, Container, Divider, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { PuzzleView } from "./components/PuzzleView";
import { SolvePuzzle } from "./components/SolvePuzzle";
import { UploadFile } from "./components/UploadFile";
import { Puzzle } from "./solvers/SolverTemplate";

function App() {
  const [sudoku, setSudoku] = useState<Puzzle>();
  const [solvedSudoku, setSolvedSudoku] = useState<Puzzle | null | undefined>();

  const setSudokuPuzzle = (sudoku?: Puzzle) => {
    setSudoku(sudoku);
    if (!sudoku) {
      setSolvedSudoku(undefined);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: "4rem" }}>
      <Stack spacing="2rem">
        <Typography variant="h1" textAlign="center">
          Sudoku Solver
        </Typography>
        <Divider />
        <UploadFile sudoku={sudoku} setSudoku={setSudokuPuzzle} />
        {sudoku && (
          <>
            <PuzzleView sudoku={sudoku} originalOrWorking="originalGrid" />
            <Divider />
            <SolvePuzzle sudoku={sudoku} setSolved={setSolvedSudoku} />
          </>
        )}
        {solvedSudoku === null && (
          <Alert severity="error">This is Not Solvable</Alert>
        )}
        {solvedSudoku && (
          <PuzzleView sudoku={solvedSudoku} originalOrWorking={"workingGrid"} />
        )}
      </Stack>
    </Container>
  );
}

export default App;

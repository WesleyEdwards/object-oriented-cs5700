import { Container, Divider, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { PuzzleView } from "./components/PuzzleView";
import { SolvePuzzle } from "./components/SolvePuzzle";
import { UploadFile } from "./components/UploadFile";
import { Puzzle } from "./solvers/SolverTemplate";

function App() {
  const [sudoku, setSudoku] = useState<Puzzle>();
  const [solvedSudoku, setSolvedSudoku] = useState<Puzzle | null | undefined>();

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
            <PuzzleView sudoku={sudoku} />
            <Divider />
            <SolvePuzzle sudoku={sudoku} setSolved={setSolvedSudoku} />
          </>
        )}
        {solvedSudoku && <div>Puzzle Solved</div>}
      </Stack>
    </Container>
  );
}

export default App;

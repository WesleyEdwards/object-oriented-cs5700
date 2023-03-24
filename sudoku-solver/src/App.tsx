import { Container, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { PuzzleView } from "./components/PuzzleView";
import { SolvePUzzle } from "./components/SolvePUzzle";
import { UploadFile } from "./components/UploadFile";
import { Puzzle } from "./solver";

function App() {
  const [sudoku, setSudoku] = useState<Puzzle>();
  return (
    <Container maxWidth="lg" sx={{ py: "4rem" }}>
      <Stack spacing="2rem">
        <Typography variant="h1" textAlign="center">
          Sudoku Solver
        </Typography>
        <UploadFile sudoku={sudoku} setSudoku={setSudoku} />
        {sudoku && (
          <>
            <PuzzleView sudoku={sudoku} />
            <SolvePUzzle sudoku={sudoku} />
          </>
        )}
      </Stack>
    </Container>
  );
}

export default App;

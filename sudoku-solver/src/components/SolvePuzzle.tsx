import { Button, Stack } from "@mui/material";
import { FC, useState } from "react";
import { Puzzle } from "../solvers/SolverTemplate";
import { Backtrack } from "../solvers/Backtrack";
import { BruteForce } from "../solvers/BruteForce";
import { Stochastic } from "../solvers/Stochastic";

interface SolvePuzzleProps {
  sudoku: Puzzle;
  setSolved: (sudoku: Puzzle | null) => void;
}

export const SolvePuzzle: FC<SolvePuzzleProps> = ({ sudoku, setSolved }) => {
  const solvePuzzle = () => {
    const solver = new Backtrack(sudoku);
    const solved = solver.solve();
    setSolved(solved);
  };

  return (
    <Stack direction="row" justifyContent="center" gap="2rem">
      <Button
        variant="outlined"
        onClick={solvePuzzle}
        sx={{ minWidth: "12rem", alignSelf: "center", height: "3.5rem" }}
      >
        Solve
      </Button>
    </Stack>
  );
};

export default SolvePuzzle;

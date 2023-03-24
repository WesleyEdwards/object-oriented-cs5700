import { Button } from "@mui/material";
import { FC } from "react";
import { Puzzle } from "../solver";
import { PuzzleSolver } from "../solvers/SolveManager";

interface SolvePUzzleProps {
  sudoku: Puzzle;
}

export const SolvePUzzle: FC<SolvePUzzleProps> = ({ sudoku }) => {
  const puzzleSolver = new PuzzleSolver(sudoku);

  const solvePuzzle = () => {
    puzzleSolver.solvePuzzle();
  };

  return (
    <Button
      variant="outlined"
      onClick={solvePuzzle}
      sx={{ minWidth: "12rem", alignSelf: "center" }}
    >
      Solve
    </Button>
  );
};

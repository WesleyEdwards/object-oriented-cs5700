import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { SudokuGrid } from "../solvers/SolverTemplate";
import { SolveManager, SolverPossibility } from "../lib/SolveManager";
import { GridStatus } from "../App";

interface SolvePuzzleProps {
  workingGrid: SudokuGrid;
  possibleValues: string[];
  setGrid: (sudoku: GridStatus) => void;
}

type StepInfo = {
  stepName: string;
  solver: SolverPossibility;
};

export const SolvePuzzle: FC<SolvePuzzleProps> = ({
  workingGrid,
  possibleValues,
  setGrid,
}) => {
  const solveManager = new SolveManager(workingGrid, possibleValues);

  const tryToSolve = (version: SolverPossibility) => {
    const newSudoku = solveManager.findAll(version);
    if (newSudoku === null) return setGrid("unsolvable");
    setGrid(newSudoku);
  };

  const buttons: Record<string, SolverPossibility> = {
    "Check Possibilities": "possibility",
    "Sole Candidates": "soleCandidate",
    "Hidden Singles": "hiddenSingle",
    "Brute Force": "backtrack",
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      gap="2rem"
      alignItems="center"
    >
      {Object.entries(buttons).map(([name, solver]) => (
        <Button
          key={name}
          variant="outlined"
          onClick={() => tryToSolve(solver)}
          sx={{ minWidth: "12rem", alignSelf: "center" }}
        >
          {name}
        </Button>
      ))}
    </Stack>
  );
};

export default SolvePuzzle;

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
  const [step, setStep] = useState<number>(0);
  const solveManager = new SolveManager(workingGrid, possibleValues);

  const solvePuzzle = () => {
    const { solver } = SolveSteps[step];
    const newSudoku = solveManager.findAll(solver);
    if (newSudoku === null) return setGrid("unsolvable");
    setGrid(newSudoku);
    setStep(step + 1);
    solveManager.updateHints();
    if (solveManager.isSolved) return setGrid("solved");
  };

  const SolveSteps: Record<number, StepInfo> = {
    0: {
      stepName: "Find Possibilities",
      solver: "possibility",
    },
    1: {
      stepName: "Sole Candidate",
      solver: "soleCandidate",
    },
    2: {
      stepName: "Brute Force",
      solver: "backtrack",
    },
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      gap="2rem"
      alignItems="center"
    >
      {`Step ${step + 1}, ${SolveSteps[step].stepName}`}
      <Button
        variant="outlined"
        onClick={solvePuzzle}
        sx={{ minWidth: "12rem", alignSelf: "center" }}
      >
        Solve Step
      </Button>
    </Stack>
  );
};

export default SolvePuzzle;

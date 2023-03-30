import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
  Puzzle,
  SolveMethodTemplate,
  SudokuGrid,
} from "../solvers/SolverTemplate";
import { NakedSingle } from "../lib/solvingTechniques.ts/NakedSingle";
import { FindInitialPossibilities } from "../lib/solvingTechniques.ts/FindInitialPossibilities";

interface SolvePuzzleProps {
  sudoku: Puzzle;
  setSolved: (sudoku: SudokuGrid | null) => void;
}

type StepInfo = {
  stepName: string;
  solver: SolveMethodTemplate;
};

export const SolvePuzzle: FC<SolvePuzzleProps> = ({ sudoku, setSolved }) => {
  const [step, setStep] = useState<number>(0);
  const solvePuzzle = () => {
    const { solver } = SolveSteps[step];
    const newSudoku = solver.findAll();
    if (newSudoku === null) return setSolved(null);
    setSolved(newSudoku);
    setStep(step + 1);
    return;
  };

  const SolveSteps: Record<number, StepInfo> = {
    0: {
      stepName: "Find Possibilities",
      solver: new FindInitialPossibilities(sudoku.workingGrid),
    },
    1: {
      stepName: "Naked Single",
      solver: new NakedSingle(sudoku.workingGrid),
    },
    2: {
      stepName: "Hidden Single",
      solver: new NakedSingle(sudoku.workingGrid),
    },
  };

  const maxSteps = Object.keys(SolveSteps).length;

  return (
    <Stack direction="row" justifyContent="center" gap="2rem">
      {step === maxSteps ? (
        <Typography>All Done!</Typography>
      ) : (
        <Button
          variant="outlined"
          onClick={solvePuzzle}
          sx={{ minWidth: "12rem", alignSelf: "center", height: "3.5rem" }}
        >
          {SolveSteps[step].stepName}
        </Button>
      )}
    </Stack>
  );
};

export default SolvePuzzle;

import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import {
  Puzzle,
  SolveMethodTemplate,
  SudokuGrid,
} from "../solvers/SolverTemplate";
import { NakedSingle } from "../lib/solvingTechniques.ts/NakedSingle";
import { FindInitialPossibilities } from "../lib/solvingTechniques.ts/FindInitialPossibilities";
import { UniqueCandidate } from "../lib/solvingTechniques.ts/UniqueCandidate";
import { SoleCandidate } from "../lib/solvingTechniques.ts/SoleCandidate";

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
  const solveOneStep = () => {
    const { solver } = SolveSteps[step];
    const res = solver.findOne();
    if (res === null) {
      setStep(step + 1);
      return;
    }
    setSolved(res);
  };

  const SolveSteps: Record<number, StepInfo> = {
    0: {
      stepName: "Find Possibilities",
      solver: new FindInitialPossibilities(sudoku.workingGrid),
    },
    1: {
      stepName: "Sole Candidate",
      solver: new SoleCandidate(sudoku.workingGrid),
    },
    2: {
      stepName: "Unique Candidate",
      solver: new UniqueCandidate(sudoku.workingGrid, sudoku.possibleValues),
    },
    3: {
      stepName: "Hidden Single",
      solver: new NakedSingle(sudoku.workingGrid),
    },
  };

  const maxSteps = Object.keys(SolveSteps).length;

  return (
    <Stack
      direction="row"
      justifyContent="center"
      gap="2rem"
      alignItems="center"
    >
      {step === maxSteps ? (
        <Typography>All Done!</Typography>
      ) : (
        <>
          {SolveSteps[step].stepName}
          <Button
            variant="outlined"
            onClick={solvePuzzle}
            sx={{ minWidth: "12rem", alignSelf: "center" }}
          >
            Solve All
          </Button>
          <Button
            variant="outlined"
            onClick={solveOneStep}
            sx={{ minWidth: "12rem", alignSelf: "center" }}
          >
            One Step
          </Button>
        </>
      )}
    </Stack>
  );
};

export default SolvePuzzle;

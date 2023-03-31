import { Button, Stack, Typography } from "@mui/material";
import { FC, useState } from "react";
import { SudokuGrid } from "../solvers/SolverTemplate";
import { SolveManager, SolverPossibility } from "../lib/SolveManager";

interface SolvePuzzleProps {
  workingGrid: SudokuGrid;
  possibleValues: string[];
  setSolved: (sudoku: SudokuGrid | null) => void;
}

type StepInfo = {
  stepName: string;
  solver: SolverPossibility;
};

export const SolvePuzzle: FC<SolvePuzzleProps> = ({
  workingGrid,
  possibleValues,
  setSolved,
}) => {
  const [step, setStep] = useState<number>(0);
  const solveManager = new SolveManager(workingGrid, possibleValues);

  const solvePuzzle = () => {
    const { solver } = SolveSteps[step];
    const newSudoku = solveManager.findAll(solver);
    if (newSudoku === null) return setSolved(null);
    setSolved(newSudoku);
    setStep(step + 1);
    solveManager.updateHints();
    return;
  };

  const solveOneStep = () => {
    const { solver } = SolveSteps[step];
    const res = solveManager.findOne(solver);
    if (solver !== "possibility") solveManager.updateHints();
    if (res === null) {
      setStep(step + 1);
      return;
    }
    setSolved(res);
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
      stepName: "Unique Candidate",
      solver: "uniqueCandidate",
    },
    3: {
      stepName: "Hidden Single",
      solver: "nakedSingle",
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

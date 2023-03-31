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
    const newSudoku = solveManager.findAll(solverStepsThing);
    if (newSudoku === null) return setGrid("unsolvable");
    if (step < 9) {
      setGrid(newSudoku);
    }
    setStep(step + 1);
    if (solveManager.isSolved) return setGrid("solved");
    // const updated = solveManager.updateHints();
    // console.log(updated);
    // setGrid(updated);
  };

  const solverStepsThing = (() => {
    switch (step) {
      case 0:
        return "possibility";
      case 1:
        return "soleCandidate";
      case 2:
        return "backtrack";
      default:
        return "possibility";
    }
  })();

  const tryToSolve = () => {
    const newSudoku = solveManager.findAll("soleCandidate");
    const newSudoku1 = solveManager.findAll("possibility");
    if (newSudoku1 === null) return setGrid("unsolvable");
    setGrid(newSudoku1);
  };

  return (
    <Stack
      direction="row"
      justifyContent="center"
      gap="2rem"
      alignItems="center"
    >
      {`Step ${step + 1}, ${solverStepsThing ?? "IDK which"}`}
      <Button
        variant="outlined"
        onClick={solvePuzzle}
        sx={{ minWidth: "12rem", alignSelf: "center" }}
      >
        Solve Step
      </Button>
      <Button
        variant="outlined"
        onClick={tryToSolve}
        sx={{ minWidth: "12rem", alignSelf: "center" }}
      >
        Try to solve...
      </Button>
    </Stack>
  );
};

export default SolvePuzzle;

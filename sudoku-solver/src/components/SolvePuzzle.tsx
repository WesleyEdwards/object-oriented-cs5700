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
  // const [step, setStep] = useState<number>(0);
  const solveManager = new SolveManager(workingGrid, possibleValues);

  // const solvePuzzle = () => {
  //   const newSudoku = solveManager.findAll(solverStepsThing);
  //   if (newSudoku === null) return setGrid("unsolvable");
  //   if (step < 9) {
  //     setGrid(newSudoku);
  //   }
  //   setStep(step + 1);
  //   if (solveManager.isSolved) return setGrid("solved");
  //   // const updated = solveManager.updateHints();
  //   // console.log(updated);
  //   // setGrid(updated);
  // };

  const tryToSolve = (version: SolverPossibility) => {
    const newSudoku = solveManager.findAll(version);
    if (newSudoku === null) return setGrid("unsolvable");
    setGrid(newSudoku);
  };

  // const solverStepsThing = (() => {
  //   switch (step) {
  //     case 0:
  //       return "possibility";
  //     case 1:
  //       return "soleCandidate";
  //     case 2:
  //       return "backtrack";
  //     default:
  //       return "possibility";
  //   }
  // })();

  return (
    <Stack
      direction="row"
      justifyContent="center"
      gap="2rem"
      alignItems="center"
    >
      <Button
        variant="outlined"
        onClick={() => tryToSolve("possibility")}
        sx={{ minWidth: "12rem", alignSelf: "center" }}
      >
        find possibilities
      </Button>
      <Button
        variant="outlined"
        onClick={() => tryToSolve("soleCandidate")}
        sx={{ minWidth: "12rem", alignSelf: "center" }}
      >
        Sole
      </Button>
      <Button
        variant="outlined"
        onClick={() => tryToSolve("backtrack")}
        sx={{ minWidth: "12rem", alignSelf: "center" }}
      >
        Brute Force
      </Button>
    </Stack>
  );
};

export default SolvePuzzle;

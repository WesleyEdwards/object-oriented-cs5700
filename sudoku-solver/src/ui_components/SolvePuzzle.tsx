import { Button, Divider, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { SudokuGrid } from "../solving_classes/SolverTemplate";
import { SolveManager, SolverPossibility } from "../solving_classes/SolveManager";
import { GridStatus } from "../App";

interface SolvePuzzleProps {
  workingGrid: SudokuGrid;
  possibleValues: string[];
  setGrid: (sudoku: GridStatus) => void;
}

export const SolvePuzzle: FC<SolvePuzzleProps> = ({
  workingGrid,
  possibleValues,
  setGrid,
}) => {
  const solveManager = new SolveManager(workingGrid, possibleValues);

  const tryToSolve = (version: SolverPossibility) => {
    const newSudoku = solveManager.solveUsingMethod(version);
    if (newSudoku === null) return setGrid("unsolvable");
    if (solveManager.isSolved) return setGrid("solved");
    setGrid(newSudoku);
  };

  const buttons: Record<string, SolverPossibility> = {
    "Check Possibilities": "possibility",
    "Sole Candidates": "soleCandidate",
    "Hidden Singles": "hiddenSingle",
    "Naked Double": "nakedDouble",
    "Brute Force": "backtrack",
  };

  return (
    <>
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
      <Divider />
      <Stack
        direction="row"
        justifyContent="center"
        gap="2rem"
        alignItems="center"
      >
        <Typography variant="h6">Solve Everything</Typography>
        <Button variant="contained" onClick={() => tryToSolve("all")}>
          Using only cell solutions
        </Button>
        <Button variant="contained" onClick={() => tryToSolve("backtrack")}>
          Brute force included
        </Button>
      </Stack>
    </>
  );
};

export default SolvePuzzle;

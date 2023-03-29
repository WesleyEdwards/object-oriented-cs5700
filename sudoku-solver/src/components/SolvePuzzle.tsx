import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { FC, useState } from "react";
import { Puzzle } from "../solvers/SolverTemplate";
import { Backtrack } from "../solvers/Backtrack";
import { BruteForce } from "../solvers/BruteForce";
import { Stochastic } from "../solvers/Stochastic";

interface SolvePuzzleProps {
  sudoku: Puzzle;
  setSolved: (sudoku: Puzzle | null) => void;
}

type SolverOptions = "backTrack" | "bruteForce" | "stochastic" | "walkSat";

export const SolvePuzzle: FC<SolvePuzzleProps> = ({ sudoku, setSolved }) => {
  const [solver, setSolver] = useState<SolverOptions>("bruteForce");

  const sudokuSolver = (() => {
    if (solver === "walkSat") return new BruteForce(sudoku);
    if (solver === "bruteForce") return new BruteForce(sudoku);
    if (solver === "backTrack") return new Backtrack(sudoku);
    return new Stochastic(sudoku);
  })();

  const solvePuzzle = () => {
    const solved = sudokuSolver.solve();
    setSolved(solved);
  };

  return (
    <Stack direction="row" justifyContent="center" gap="2rem">
      <FormControl sx={{ minWidth: "14rem" }}>
        <InputLabel>Solver</InputLabel>
        <Select
          label="Solver"
          value={solver}
          onChange={(e) => setSolver(e.target.value as SolverOptions)}
        >
          <MenuItem value={"walkSat"}>Walk Sat</MenuItem>
          <MenuItem value={"bruteForce"}>Bute Force</MenuItem>
          <MenuItem value={"backTrack"}>Back Track</MenuItem>
          <MenuItem value={"stochastic"}>
            {"Stochastic (optimization)"}
          </MenuItem>
        </Select>
      </FormControl>
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

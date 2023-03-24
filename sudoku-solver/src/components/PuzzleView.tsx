import { Stack, Typography } from "@mui/material";
import { Puzzle } from "../solvers/SolverTemplate";
import { cellPixelSize } from "../utils";

type PuzzleViewProps = {
  sudoku: Puzzle;
  initial?: boolean;
};

export const PuzzleView = (props: PuzzleViewProps) => {
  const { sudoku, initial = true } = props;

  const eachWidth = cellPixelSize[sudoku.dimensions];
  const widthHeight = eachWidth * sudoku.dimensions;

  return (
    <>
      {initial && <Typography textAlign="center">Unsolved Puzzle</Typography>}
      <Stack direction="column" height={`${widthHeight}px`} alignSelf="center">
        {sudoku.sudokuGrid.map((row, rowIndex) => {
          return (
            <Stack
              direction="row"
              width={`${widthHeight}px`}
              key={rowIndex + 1000}
            >
              {row.map((cell, cellIndex) => {
                return (
                  <Stack
                    sx={{ width: `${eachWidth}px`, height: `${eachWidth}px` }}
                    key={cellIndex}
                    border={1}
                    borderColor="grey.500"
                    justifyContent="center"
                  >
                    <Typography textAlign="center" variant="h6">
                      {initial ? cell.originalValue : cell.assignedValue}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

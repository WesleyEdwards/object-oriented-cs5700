import { Stack, Typography } from "@mui/material";
import { cellPixelSize } from "../lib/helpers";
import { Puzzle } from "../solvers/SolverTemplate";
import { RenderCell } from "./RenderCell";

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
                  <RenderCell
                    key={cellIndex}
                    dimensions={sudoku.dimensions}
                    cell={cell}
                    initial={initial}
                  />
                );
              })}
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};

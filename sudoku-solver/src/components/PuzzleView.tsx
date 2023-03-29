import { Stack, Typography } from "@mui/material";
import { cellPixelSize, WhichGrid } from "../lib/helpers";
import { Puzzle } from "../solvers/SolverTemplate";
import { RenderCell } from "./RenderCell";

type PuzzleViewProps = {
  sudoku: Puzzle;
  originalOrWorking: WhichGrid;
};

export const PuzzleView = (props: PuzzleViewProps) => {
  const { sudoku, originalOrWorking = "originalGrid" } = props;

  const eachWidth = cellPixelSize[sudoku.dimensions];
  const widthHeight = eachWidth * sudoku.dimensions;

  return (
    <>
      {originalOrWorking === "originalGrid" && (
        <Typography textAlign="center">Unsolved Puzzle</Typography>
      )}
      <Stack direction="column" height={`${widthHeight}px`} alignSelf="center">
        {sudoku[originalOrWorking].map((row, rowIndex) => {
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
                    initial={originalOrWorking}
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

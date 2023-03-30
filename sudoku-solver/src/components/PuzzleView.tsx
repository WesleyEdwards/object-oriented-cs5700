import { Stack, Typography } from "@mui/material";
import { cellPixelSize } from "../lib/helpers";
import { Puzzle, SudokuGrid } from "../solvers/SolverTemplate";
import { RenderCell } from "./RenderCell";

type PuzzleViewProps = {
  grid: SudokuGrid;
  dimensions: number;
};

export const PuzzleView = (props: PuzzleViewProps) => {
  const { dimensions, grid } = props;

  const eachWidth = cellPixelSize[dimensions];
  const widthHeight = eachWidth * dimensions;

  return (
    <>
      <Stack direction="column" height={`${widthHeight}px`} alignSelf="center">
        {grid.map((row, rowIndex) => {
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
                    dimensions={dimensions}
                    cell={cell}
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

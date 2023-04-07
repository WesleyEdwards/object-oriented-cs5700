import { Stack, Typography } from "@mui/material";
import { Puzzle, SudokuGrid } from "../lib/SolverTemplate";
import { RenderCell } from "./RenderCell";
import { cellPixelSize } from "../lib/helpers";

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
            <Stack direction="row" width={`${widthHeight}px`} key={rowIndex}>
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

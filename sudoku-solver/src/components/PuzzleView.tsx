import { Stack, Typography } from "@mui/material";
import { Puzzle } from "../solver";

type PuzzleViewProps = {
  sudoku: Puzzle;
  initial?: boolean;
};

export const PuzzleView = (props: PuzzleViewProps) => {
  const { sudoku, initial = true } = props;
  return (
    <>
      {initial && <Typography textAlign="center">Initial</Typography>}
      <Stack
        direction="column"
        height="400px"
        justifyContent="space-evenly"
        alignSelf="center"
      >
        {sudoku.puzzle.map((row, rowIndex) => {
          return (
            <Stack
              direction="row"
              width="400px"
              key={rowIndex}
              justifyContent="space-evenly"
            >
              {row.map((cell, cellIndex) => {
                return (
                  <Stack justifyContent="space-between">
                    <Typography variant="h6" key={cellIndex}>
                      {cell}
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

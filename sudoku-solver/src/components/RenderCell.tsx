import { Grid, Stack, Typography } from "@mui/material";
import { FC } from "react";
import { BoxWidthMap, cellPixelSize } from "../lib/helpers";
import { Cell } from "../solvers/SolverTemplate";

export const RenderCell: FC<{
  dimensions: number;
  cell: Cell;
}> = ({ dimensions, cell }) => {
  const eachWidth = cellPixelSize[dimensions];
  const boxWidth = BoxWidthMap[dimensions];
  return (
    <Stack
      sx={{ width: `${eachWidth}px`, height: `${eachWidth}px` }}
      border={1}
      borderColor="grey.500"
      borderRight={cell.col % boxWidth === boxWidth - 1 ? 3 : undefined}
      borderBottom={cell.row % boxWidth === boxWidth - 1 ? 3 : undefined}
      borderLeft={cell.col === 0 ? 3 : undefined}
      borderTop={cell.row === 0 ? 3 : undefined}
      alignItems="center"
      justifyContent="center"
    >
      {(() => {
        if (cell.originalValue || cell.assignedValue) {
          return (
            <Typography textAlign="center" variant="h6">
              {cell.assignedValue}
            </Typography>
          );
        }

        if (boxWidth > 3) {
          return (
            <div
              style={{
                display: "flex",
                width: "100%",
                height: "100",
                backgroundColor: "lightgrey",
              }}
            />
          );
        }

        return (
          <Grid container>
            {cell.possibleValues.map((value, index) => {
              return (
                <div
                  style={{ width: eachWidth / 3, height: eachWidth / 3 }}
                  key={index}
                >
                  <Grid item key={index}>
                    <Typography
                      textAlign="center"
                      color={"grey"}
                      fontSize={`${eachWidth / 3}px`}
                    >
                      {value}
                    </Typography>
                  </Grid>
                </div>
              );
            })}
          </Grid>
        );
      })()}
    </Stack>
  );
};

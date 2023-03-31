import { Button, IconButton, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Puzzle } from "../solvers/SolverTemplate";
import ClearIcon from "@mui/icons-material/Clear";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { FileManager } from "../FileManager";

type UploadFileProps = {
  setSudoku: (sudoku: Puzzle | undefined) => void;
  sudoku?: Puzzle;
  setError(message: string): void;
};
export const UploadFile = (props: UploadFileProps) => {
  const { setSudoku, sudoku, setError } = props;

  const fileManager = new FileManager();

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) =>
    fileManager
      .parsePuzzle(event)
      .then((sudoku) => {
        setSudoku(sudoku);
      })
      .catch((e) => {
        setError(e);
      });

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      {sudoku?.fileName ? (
        <Stack direction="row" alignItems="center" gap="1rem">
          <IconButton
            size="large"
            onClick={() => {
              if (inputRef.current) {
                inputRef.current.files = null;
                inputRef.current.value = "";
              }
              setSudoku(undefined);
            }}
          >
            <ClearIcon />
          </IconButton>
          <Typography variant="h5">{sudoku.fileName + " (Initial)"}</Typography>
        </Stack>
      ) : (
        <Button
          variant="outlined"
          onClick={() => inputRef.current?.click()}
          startIcon={<UploadFileIcon />}
        >
          Upload Puzzle
        </Button>
      )}

      <input
        accept=".txt"
        type="file"
        ref={inputRef}
        onChange={handleSelectFile}
        hidden
        multiple={false}
      />
    </div>
  );
};

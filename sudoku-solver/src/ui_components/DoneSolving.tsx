import DownloadIcon from "@mui/icons-material/Download";
import { FC } from "react";
import { Puzzle } from "../lib/SolverTemplate";
import { Button, Stack } from "@mui/material";
import { turnToText } from "../lib/utils";

interface DoneSolvingProps {
  puzzle: Puzzle;
  download: (fileData: string, fileName: string) => void;
}
export const DoneSolving: FC<DoneSolvingProps> = ({ puzzle, download }) => {
  const downloadFile = () => {
    const sudokuText = turnToText(puzzle.workingGrid);
    download(sudokuText, `${puzzle.fileName} (solved).txt`);
  };

  return (
    <Stack direction="row" justifyContent="center">
      <Button variant="contained" onClick={downloadFile}>
        <DownloadIcon />
        Download
      </Button>
    </Stack>
  );
};

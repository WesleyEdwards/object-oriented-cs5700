import DownloadIcon from "@mui/icons-material/Download";
import { FC } from "react";
import { Puzzle } from "../solvers/SolverTemplate";
import { Button, Stack } from "@mui/material";
import { turnToText } from "../lib/utils";

export const DoneSolving: FC<{ puzzle: Puzzle }> = ({ puzzle }) => {
  const downloadFile = () => {
    const sudokuText = turnToText(puzzle.workingGrid);
    createBlobAndDownload(sudokuText, `${puzzle.fileName} (solved).txt`);
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

function createBlobAndDownload(fileDatA: string, fileName: string) {
  const blob = new Blob([fileDatA], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);

  const downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = fileName;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

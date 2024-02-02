import React from "react";
import { Stack } from "@mui/material";
import { TextChip, ProgressBar } from "../../../components";

const Progress = ({ type, numOfPassed, listLength }) => {
  const percentage = Math.floor((numOfPassed / listLength) * 100);

  return (
    <>
      <Stack direction="row" alignItems="center" spacing={2}>
        <TextChip label={`${type === "word" ? "단어" : "뜻"} 테스트`} />
        <TextChip label={`${percentage} %`} />
      </Stack>
      <ProgressBar {...{ percentage, numOfPassed, listLength }} />
    </>
  );
};

export default React.memo(
  Progress,
  (prevProps, nextProps) => prevProps.numOfPassed === nextProps.numOfPassed
);

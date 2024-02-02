import React from "react";
import { TextChip } from "../../../components";

const Timer = ({ questionTimer }) => {
  return (
    <TextChip
      label={`${questionTimer}`}
      sx={questionTimer === 0 && { color: "white", backgroundColor: "#ff6c6c" }}
    />
  );
};

export default React.memo(
  Timer,
  (prevProps, nextProps) => prevProps.questionTimer === nextProps.questionTimer
);

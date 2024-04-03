import React from "react";
import { Stack, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

const NextBtns = ({
  handleClickPassBtn,
  handleClickFailBtn,
  isTimeOut = false,
}) => {
  return (
    <Stack direction="row-reverse" spacing={1}>
      {!isTimeOut ? (
        <>
          <IconButton onClick={handleClickPassBtn}>
            <CheckCircleIcon sx={{ fontSize: "40px", color: "#6d8ecc" }} />
          </IconButton>
          <IconButton onClick={handleClickFailBtn}>
            <CancelIcon sx={{ fontSize: "40px", color: "#ff6c6c" }} />
          </IconButton>
        </>
      ) : (
        <IconButton onClick={handleClickFailBtn}>
          <PlayCircleIcon sx={{ fontSize: "40px", color: "#77b97a" }} />
        </IconButton>
      )}
    </Stack>
  );
};

// handleClickFailBtn은 검사할 필요 없음
export default React.memo(
  NextBtns,
  (prevProps, nextProps) =>
    prevProps.handleClickPassBtn === nextProps.handleClickPassBtn &&
    prevProps.isTimeOut === nextProps.isTimeOut
);

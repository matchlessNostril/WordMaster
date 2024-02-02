import React from "react";
import { Stack, IconButton } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import { isEqual } from "lodash";

const NextBtns = ({ onClickPassBtn, onClickFailBtn, isTimeOut = false }) => {
  return (
    <Stack direction="row-reverse" spacing={1}>
      {!isTimeOut ? (
        <>
          <IconButton onClick={onClickPassBtn}>
            <CheckCircleIcon sx={{ fontSize: "40px", color: "#6d8ecc" }} />
          </IconButton>
          <IconButton onClick={onClickFailBtn}>
            <CancelIcon sx={{ fontSize: "40px", color: "#ff6c6c" }} />
          </IconButton>
        </>
      ) : (
        <IconButton onClick={onClickFailBtn}>
          <PlayCircleIcon sx={{ fontSize: "40px", color: "#77b97a" }} />
        </IconButton>
      )}
    </Stack>
  );
};

// onClickPassBtn 함수와 isTimeOut을 검사해야 하기 때문에 isEqual 사용
export default React.memo(NextBtns, (prevProps, nextProps) =>
  isEqual(prevProps, nextProps)
);

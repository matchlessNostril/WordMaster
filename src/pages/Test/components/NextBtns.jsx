import React from "react";
import { Stack, Button, useTheme, alpha } from "@mui/material";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowSharpIcon from "@mui/icons-material/PlayArrowSharp";

const ActionButton = ({ onClick, icon, text, colorKey }) => {
  const theme = useTheme();
  const color = theme.palette[colorKey];

  return (
    <Button
      onClick={onClick}
      sx={{
        padding: "0.5rem 0.6rem",
        backgroundColor: alpha(color[500], 0.2),
        border: `2px solid ${alpha(color[500], 0.5)}`,
        borderRadius: "12px",
        color: color[400] || color[500],
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "8px",
        transition: "all 0.2s ease",
        boxShadow: `0 10px 15px -3px ${alpha(
          color[500],
          0.1
        )}, 0 4px 6px -2px ${alpha(color[500], 0.1)}`,
        "&:hover": {
          backgroundColor: alpha(color[500], 0.3),
          boxShadow: `0 10px 15px -3px ${alpha(
            color[500],
            0.25
          )}, 0 4px 6px -2px ${alpha(color[500], 0.25)}`,
        },
        "&:active": {
          transform: "scale(0.98)",
        },
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: "20px" } })}
      {text}
    </Button>
  );
};

const NextBtns = ({
  handleClickPassBtn,
  handleClickFailBtn,
  isTimeOut = false,
}) => {
  if (isTimeOut) {
    return (
      <Stack direction="row" spacing={2} justifyContent="flex-end">
        <ActionButton
          onClick={handleClickFailBtn}
          icon={<PlayArrowSharpIcon />}
          text="次へ"
          colorKey="emerald"
        />
      </Stack>
    );
  }

  return (
    <Stack direction="row" spacing={2} justifyContent="flex-end">
      <ActionButton
        onClick={handleClickFailBtn}
        icon={<CloseIcon />}
        text="不正解"
        colorKey="red"
      />
      <ActionButton
        onClick={handleClickPassBtn}
        icon={<CheckSharpIcon />}
        text="正解"
        colorKey="blue"
      />
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

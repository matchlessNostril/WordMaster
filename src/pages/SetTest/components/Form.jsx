import React from "react";
import { Box, FormControl, useTheme } from "@mui/material";
import TestTypeSelector from "./TestTypeSelector";
import TimerToggle from "./TimerToggle";

const Form = ({ radio, handleRadio, timer, handleTimer }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <strong
        style={{
          fontSize: "1.25rem",
          color: theme.palette.textColors.slate200,
          marginBottom: "8px",
        }}
      >
        テスト設定
      </strong>
      <FormControl sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TestTypeSelector value={radio} onChange={handleRadio} />
        <TimerToggle timer={timer} handleTimer={handleTimer} />
      </FormControl>
    </Box>
  );
};

export default React.memo(
  Form,
  (prevProps, nextProps) =>
    prevProps.radio === nextProps.radio && prevProps.timer === nextProps.timer
);

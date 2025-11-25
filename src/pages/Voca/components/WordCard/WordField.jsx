import React from "react";
import { Typography, useTheme } from "@mui/material";

const WordField = ({ label, value }) => {
  const theme = useTheme();

  return (
    <>
      <Typography
        sx={{
          fontSize: "0.875rem",
          color: theme.palette.textColors.slate400,
          fontWeight: 500,
          mb: 1,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          fontSize: "1rem",
          color: theme.palette.textColors.slate100,
          whiteSpace: "pre-line",
        }}
      >
        {value}
      </Typography>
    </>
  );
};

export default React.memo(WordField);

import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import HourglassDisabledSharpIcon from "@mui/icons-material/HourglassDisabledSharp";

const NoFile = ({ text }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        gap: "24px",
      }}
    >
      {/* Outer ring */}
      <Box
        sx={{
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            border: `2px solid ${theme.palette.slate[700]}`,
          }}
        />
        {/* Inner icon */}
        <Box
          sx={{
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            backgroundImage: `linear-gradient(to bottom right, ${theme.palette.amber[200]}, ${theme.palette.amber[300]})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <HourglassDisabledSharpIcon
            sx={{
              width: "18px",
              height: "18px",
              color: "white",
            }}
          />
        </Box>
      </Box>
      <Typography
        variant="body1"
        sx={{
          color: theme.palette.textColors.slate400,
          fontSize: "0.9375rem",
          fontWeight: 400,
          textAlign: "center",
          lineHeight: 1.6,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default React.memo(NoFile);

import React from "react";
import { Card, useTheme } from "@mui/material";
import { alpha } from "@mui/material";

const StyledCard = ({ children, maxHeight = "35vh", minHeight = "35vh" }) => {
  const theme = useTheme();
  return (
    <Card
      sx={{
        display: "flex",
        height: "fit-content",
        minHeight: minHeight ? minHeight : "",
        maxHeight: maxHeight ? maxHeight : "",
        flexDirection: "column",
        backgroundColor: "transparent",
        backgroundImage: `linear-gradient(to bottom right, ${
          theme.palette.slate[800]
        }, ${alpha(theme.palette.slate[800], 0.7)})`,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderRadius: "12px",
        border: `1px solid ${alpha(theme.palette.slate[700], 0.5)}`,
        boxShadow:
          "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        padding: "24px",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: alpha(theme.palette.cyan[500], 0.3),
        },
      }}
    >
      {children}
    </Card>
  );
};

export default StyledCard;

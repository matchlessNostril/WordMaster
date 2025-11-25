import React from "react";
import { Box, useTheme, alpha } from "@mui/material";

const CustomRadioButton = ({ value, selected, label, onClick }) => {
  const theme = useTheme();

  return (
    <Box
      component="button"
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1.5,
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: 0,
        "&:hover .radio-circle": {
          borderColor: theme.palette.slate[500],
        },
        "&:hover .radio-label": {
          color: selected
            ? theme.palette.cyan[400]
            : theme.palette.textColors.slate300,
        },
      }}
    >
      <Box
        className="radio-circle"
        sx={{
          width: "20px",
          height: "20px",
          borderRadius: "50%",
          border: `2px solid ${
            selected ? theme.palette.cyan[400] : theme.palette.slate[600]
          }`,
          backgroundColor: selected
            ? alpha(theme.palette.cyan[500], 0.2)
            : "transparent",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "all 0.3s ease",
        }}
      >
        {selected && (
          <Box
            sx={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundImage: `linear-gradient(to bottom right, ${theme.palette.cyan[400]}, ${theme.palette.blue[500]})`,
              boxShadow: `0 0 8px ${alpha(theme.palette.cyan[500], 0.5)}`,
            }}
          />
        )}
      </Box>
      <Box
        className="radio-label"
        component="span"
        sx={{
          fontSize: "0.875rem",
          fontWeight: 500,
          color: selected
            ? theme.palette.cyan[400]
            : theme.palette.textColors.slate400,
          transition: "color 0.3s ease",
        }}
      >
        {label}
      </Box>
    </Box>
  );
};

export default React.memo(CustomRadioButton);


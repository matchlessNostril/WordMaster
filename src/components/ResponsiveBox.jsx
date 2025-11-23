import React from "react";
import { Box, useTheme } from "@mui/material";

const ResponsiveBox = ({ children }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        [theme.breakpoints.down("sm")]: { width: "90vw", height: "90vh" },
        [theme.breakpoints.up("sm")]: {
          width: "75vw",
          height: "85vh",
        },
        mt: 2,
      }}
    >
      {children}
    </Box>
  );
};

export default ResponsiveBox;

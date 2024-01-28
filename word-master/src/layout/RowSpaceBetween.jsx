import React from "react";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/material";

const RowSpaceBetween = ({ children }) => {
  // theme
  const theme = useTheme();

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={1}
      sx={{
        [theme.breakpoints.down("sm")]: {
          width: "90vw",
        },
        [theme.breakpoints.up("sm")]: {
          width: "85vw",
        },
      }}
    >
      {children}
    </Stack>
  );
};

export default React.memo(RowSpaceBetween);

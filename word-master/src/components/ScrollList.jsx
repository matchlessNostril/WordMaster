import React from "react";
import { useTheme } from "@mui/material/styles";
import { List } from "@mui/material";

const ScrollList = ({ maxHeight, children }) => {
  const theme = useTheme();

  return (
    <List
      sx={{
        maxHeight: { maxHeight },
        [theme.breakpoints.down("sm")]: {
          maxWidth: "90vw",
        },
        [theme.breakpoints.up("sm")]: {
          maxWidth: "85vw",
        },
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#535353",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#dbdbdb",
        },
      }}
    >
      {children}
    </List>
  );
};

export default React.memo(ScrollList);

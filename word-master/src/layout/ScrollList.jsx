import React from "react";
import { List } from "@mui/material";

const ScrollList = ({ maxHeight, children }) => {
  return (
    <List
      sx={{
        maxHeight: { maxHeight },
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "10px",
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

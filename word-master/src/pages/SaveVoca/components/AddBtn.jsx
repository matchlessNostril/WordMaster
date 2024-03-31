import React from "react";
import { ListItem, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const AddBtn = React.memo(({ handleClick }) => {
  return (
    <ListItem sx={{ display: "flex", justifyContent: "center" }}>
      <IconButton onClick={handleClick}>
        <AddCircleIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    </ListItem>
  );
});

export default AddBtn;

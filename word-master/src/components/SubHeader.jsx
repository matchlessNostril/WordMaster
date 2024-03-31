import React from "react";
import { Typography, Button } from "@mui/material";
import RowSpaceBetween from "./RowSpaceBetween";

const SubHeader = ({ title, disabled, btnName, onClickHandler }) => {
  return (
    <RowSpaceBetween>
      <Typography variant="h5" ml={2}>
        <strong>{title}</strong>
      </Typography>
      <Button
        variant="contained"
        disabled={disabled}
        onClick={onClickHandler}
        sx={{ marginRight: "10px" }}
      >
        {btnName}
      </Button>
    </RowSpaceBetween>
  );
};

export default React.memo(SubHeader);

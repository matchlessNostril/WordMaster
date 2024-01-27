import React from "react";
// MUI
import { Typography, Button } from "@mui/material";
// Component
import RowSpaceBetween from "../layout/RowSpaceBetween";

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
        sx={{ marginRight: "15px" }}
      >
        {btnName}
      </Button>
    </RowSpaceBetween>
  );
};

export default React.memo(SubHeader);

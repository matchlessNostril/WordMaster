import React from "react";
import { Typography, Button } from "@mui/material";
import RowSpaceBetween from "./RowSpaceBetween";

const SubHeader = ({ title, disabled, btnName, handleClickBtn }) => {
  return (
    <RowSpaceBetween>
      <Typography variant="h5" ml={2}>
        <strong>{title}</strong>
      </Typography>
      <Button
        variant="contained"
        disabled={disabled}
        onClick={handleClickBtn}
        sx={{ marginRight: "10px" }}>
        {btnName}
      </Button>
    </RowSpaceBetween>
  );
};

export default React.memo(
  SubHeader,
  (prevProps, nextProps) =>
    prevProps.handleClickBtn === nextProps.handleClickBtn
);

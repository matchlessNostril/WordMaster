import React from "react";
// MUI
import { Typography, Button } from "@mui/material";
// Component
import RowSpaceBetween from "../../../layout/RowSpaceBetween";

const Header = ({ isModify = false, disabled, onClickHandler }) => {
  return (
    <RowSpaceBetween>
      <Typography variant="h5" ml={2}>
        <strong>단어장 {isModify ? "수정" : "만들기"}</strong>
      </Typography>
      <Button
        variant="contained"
        disabled={disabled}
        onClick={onClickHandler}
        sx={{ marginRight: "15px" }}
      >
        {isModify ? "수정" : "만들기"}
      </Button>
    </RowSpaceBetween>
  );
};

export default React.memo(Header);

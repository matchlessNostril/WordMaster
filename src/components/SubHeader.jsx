import React from "react";
import { Typography, useTheme } from "@mui/material";
import RowSpaceBetween from "./RowSpaceBetween";
import GradientButton from "./GradientButton";

const SubHeader = ({ title, disabled, btnName, handleClickBtn }) => {
  const theme = useTheme();

  return (
    <RowSpaceBetween>
      <Typography
        variant="h4"
        mt={2}
        ml={2}
        sx={{
          fontSize: "2rem",
          fontWeight: "bold",
          backgroundImage: `linear-gradient(to right, ${theme.palette.cyan[400]}, ${theme.palette.blue[400]}, ${theme.palette.purple[500]})`,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
          WebkitTextFillColor: "transparent",
        }}
      >
        {title}
      </Typography>
      <div style={{ marginRight: "15px" }}>
        <GradientButton
          disabled={disabled}
          onClick={handleClickBtn}
          text={btnName}
        />
      </div>
    </RowSpaceBetween>
  );
};

export default React.memo(
  SubHeader,
  (prevProps, nextProps) =>
    prevProps.handleClickBtn === nextProps.handleClickBtn
);

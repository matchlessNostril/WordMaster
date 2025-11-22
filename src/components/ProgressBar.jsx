import React from "react";
import { Box, Slider } from "@mui/material";

const ProgressBar = ({ percentage, numOfPassed, listLength }) => {
  return (
    <Box sx={{ flexGrow: 1 }} p={1}>
      <Slider
        value={percentage}
        marks={[
          {
            value: percentage,
            label: numOfPassed.toString(),
          },
          {
            value: 100,
            label: listLength.toString(),
          },
        ]}
        disabled
        sx={{
          marginBottom: "-2.1vh",
          "&.Mui-disabled": { color: "#535353" },
          "& > .MuiSlider-thumb": {
            width: "15px",
            height: "15px",
            backgroundColor: "white",
            border: "2px solid #535353",
          },
          "& > .MuiSlider-markLabel": {
            top: "-1.3vh",
          },
        }}
      />
    </Box>
  );
};

export default ProgressBar;

import React from "react";
import { Grid, Box } from "@mui/material";
import { fullHeightStyle, flexStyle } from "./constants";

const NumberCircle = ({ index }) => {
  return (
    <Grid
      item
      xs={2}
      sx={{
        ...fullHeightStyle,
        ...flexStyle,
        borderRight: "1px solid #dbdbdb",
      }}>
      <Box
        sx={{
          width: 30,
          height: 30,
          borderRadius: 15,
          backgroundColor: "#535353",
          color: "white",
          ...flexStyle,
        }}>
        <span
          style={{
            fontSize: index >= 100 ? "12px" : "16px",
            paddingBottom: "1px",
          }}>
          {index + 1}
        </span>
      </Box>
    </Grid>
  );
};

export default React.memo(NumberCircle);

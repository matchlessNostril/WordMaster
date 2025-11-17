import React from "react";
import { Box, TextField } from "@mui/material";

const InputField = React.memo(
  ({ label, value, autoFocus = false, type, handleInput }) => {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <TextField
          {...{ label, value, autoFocus }}
          variant="standard"
          multiline
          autoComplete="off"
          onChange={(event) => handleInput(event, type)}
          sx={{ width: "95%" }}
        />
      </Box>
    );
  }
);

export default InputField;

import React from "react";
import { Box, TextField } from "@mui/material";

const InputField = ({ handleInput }) => {
  return (
    <Box mt={1} p={1}>
      <TextField
        label="테스트 이름"
        variant="outlined"
        autoComplete="off"
        onChange={(event) => handleInput(event.target.value)}
        sx={{ width: "100%" }}
      />
    </Box>
  );
};

export default React.memo(InputField);

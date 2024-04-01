import React from "react";
import { TextField } from "@mui/material";

const MultilineTextField = ({ label, value }) => {
  return (
    <TextField
      label={label}
      variant="standard"
      value={value}
      multiline
      InputProps={{
        readOnly: true,
      }}
      sx={{ width: "90%" }}
    />
  );
};

export default React.memo(MultilineTextField);

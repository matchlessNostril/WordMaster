import React from "react";
// MUI
import { FormControl, TextField } from "@mui/material";

const JoinTextField = ({ value, setValue, fieldName, validationCheck }) => {
  return (
    <FormControl>
      <TextField
        variant="filled"
        label={fieldName}
        id={fieldName}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        // 빈 값일 때는 error가 적용되지 않도록
        error={value ? !validationCheck(value).valid : false}
        helperText={value ? validationCheck(value).helperText : ""}
      ></TextField>
    </FormControl>
  );
};

export default React.memo(JoinTextField);

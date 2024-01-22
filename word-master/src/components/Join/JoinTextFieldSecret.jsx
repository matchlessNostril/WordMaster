import React from "react";
// Hook
import { useState, useCallback } from "react";
// MUI
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// 숨김 버튼이 필요한 TextField
const JoinTextFieldSecret = ({
  value,
  setValue,
  fieldName,
  validationCheck,
}) => {
  const [showValue, setShowValue] = useState(false);
  const onClickShowBtn = useCallback(() => {
    setShowValue((prev) => !prev);
  }, []);

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
        type={showValue ? "text" : "password"}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton aria-label="글자 보여주기" onClick={onClickShowBtn}>
                {showValue ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      ></TextField>
    </FormControl>
  );
};

export default React.memo(JoinTextFieldSecret);

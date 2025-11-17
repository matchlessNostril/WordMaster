import React, { useState, useMemo, useCallback } from "react";
import {
  FormControl,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const InputField = ({
  fieldName,
  fieldType = "text",
  value,
  setValue,
  validCheck,
  valid,
  setValid,
  isPasswordVisible = true,
  handleClickShowBtn = () => {},
}) => {
  const [validHelperText, setValidHelperText] = useState("");

  // 입력값이 바뀔 때마다 setValue에서 key값으로 접근해 바꿔야 하는데
  // key값은 영어이기 때문에 영어로 변환하고
  // 다시 계산될 필요 없기 때문에 useMemo로 메모이제이션
  const fieldNameinEn = useMemo(() => {
    switch (fieldName) {
      case "ニックネーム":
        return "nickname";
      case "メールアドレス":
        return "email";
      case "パスワード":
        return "password";
    }
  }, []);

  // TextField 입력할 때마다 value 업데이트 + 유효성 검사
  const handleChange = useCallback(
    (event) => {
      // value 업데이트
      setValue((prev) => ({ ...prev, [fieldNameinEn]: event.target.value }));

      // value 유효성 검사 후 결과가 바뀌었으면, valid, validHelperText 업데이트
      const validCheckResult = validCheck(event.target.value);
      if (validCheckResult.valid === valid) return; // 결과가 그대로면 early return
      setValid((prev) => ({
        ...prev,
        [fieldNameinEn]: validCheckResult.valid,
      }));
      setValidHelperText(validCheckResult.helperText);
    },
    [valid]
  );

  return (
    <FormControl>
      <TextField
        variant="filled"
        label={fieldName}
        id={fieldName}
        value={value}
        onChange={handleChange}
        type={
          fieldType === "password" && !isPasswordVisible ? "password" : "text"
        }
        InputProps={
          fieldType === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="入力値を表示"
                      onClick={handleClickShowBtn}
                    >
                      {isPasswordVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
        // 빈 값일 때는 error가 적용되지 않도록
        error={value ? !valid : false}
        helperText={value ? validHelperText : ""}
      />
    </FormControl>
  );
};

// value, valid, showValue만 값이 바뀌기 때문에 이 값들만 비교
export default React.memo(
  InputField,
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.valid === nextProps.valid &&
    prevProps.isPasswordVisible === nextProps.isPasswordVisible
);

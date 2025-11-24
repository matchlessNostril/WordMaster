import React, { useState, useMemo, useCallback } from "react";
import { FormControl, InputAdornment, IconButton } from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Mail,
  Lock,
  Badge,
} from "@mui/icons-material";
import { useTheme } from "@mui/material";
import StyledTextField from "../../../../components/StyledTextField";

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
  const theme = useTheme();
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

  const StartIcon =
    fieldName === "メールアドレス" ? (
      <Mail sx={{ color: theme.palette.textColors.slate400 }} />
    ) : fieldName === "パスワード" ? (
      <Lock sx={{ color: theme.palette.textColors.slate400 }} />
    ) : fieldName === "ニックネーム" ? (
      <Badge sx={{ color: theme.palette.textColors.slate400 }} />
    ) : null;

  return (
    <FormControl>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <StyledTextField
          id={fieldName}
          labelText={fieldName}
          value={value}
          onChange={handleChange}
          type={
            fieldType === "password" && !isPasswordVisible ? "password" : "text"
          }
          placeholder={
            fieldName === "メールアドレス"
              ? "example@email.com"
              : fieldName === "パスワード"
              ? "••••••••"
              : fieldName === "ニックネーム"
              ? "ニックネーム"
              : ""
          }
          startAdornment={
            StartIcon ? (
              <InputAdornment position="start">{StartIcon}</InputAdornment>
            ) : undefined
          }
          endAdornment={
            fieldType === "password" ? (
              <InputAdornment position="end">
                <IconButton
                  aria-label="入力値を表示"
                  onClick={handleClickShowBtn}
                  sx={{
                    color: theme.palette.textColors.slate400,
                    "&:hover": {
                      color: theme.palette.textColors.slate300,
                    },
                  }}
                >
                  {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ) : undefined
          }
          error={value && !valid}
        />
        {value && validHelperText && (
          <div
            style={{
              marginTop: "0.5rem",
              fontSize: "0.75rem",
              color: theme.palette.red[400],
              whiteSpace: "pre-line",
            }}
          >
            {validHelperText}
          </div>
        )}
      </div>
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

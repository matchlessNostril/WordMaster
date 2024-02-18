import React, { useMemo } from "react";
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
  showValue = true,
  onClickShowBtn = () => {},
}) => {
  // 입력값이 바뀔 때마다 setValue에서 key값으로 접근해 바꿔야 하는데
  // key값은 영어이기 때문에 영어로 변환하고
  // 다시 계산될 필요 없기 때문에 useMemo로 메모이제이션
  const fieldNameinEn = useMemo(() => {
    switch (fieldName) {
      case "닉네임":
        return "nickname";
      case "이메일":
        return "email";
      case "비밀번호":
        return "password";
    }
  }, []);

  return (
    <FormControl>
      <TextField
        variant="filled"
        label={fieldName}
        id={fieldName}
        value={value}
        onChange={(event) =>
          setValue((prev) => ({ ...prev, [fieldNameinEn]: event.target.value }))
        }
        // 비밀번호란은 버튼을 통해 입력값 확인 가능
        type={fieldType === "password" && !showValue ? "password" : "text"}
        InputProps={
          fieldType === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="입력값 공개"
                      onClick={onClickShowBtn}
                    >
                      {showValue ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : undefined
        }
        // 빈 값일 때는 error가 적용되지 않도록
        error={value ? !validCheck(value).valid : false}
        helperText={value ? validCheck(value).helperText : ""}
      />
    </FormControl>
  );
};

// value랑 showValue만 값이 바뀌기 때문에 이 값들만 비교
export default React.memo(
  InputField,
  (prevProps, nextProps) =>
    prevProps.value === nextProps.value &&
    prevProps.showValue === nextProps.showValue
);

import React, { useCallback } from "react";
import { useLoading } from "../../../hooks";
import { CircularProgress } from "@mui/material";
import StyledButton from "./StyledButton";

const SubmitBtn = ({ method, disabled, onClickSubmitBtn }) => {
  // 로그인, 회원가입 처리 동안 로딩 출력
  const [onLoading, setOnLoading] = useLoading();
  const onSubmit = useCallback(async () => {
    setOnLoading(true);
    await onClickSubmitBtn();
    setOnLoading(false);
  }, [onClickSubmitBtn]);

  return (
    <StyledButton variant="contained" disabled={disabled} onClick={onSubmit}>
      {onLoading ? (
        <CircularProgress size={20} sx={{ color: "white" }} />
      ) : (
        `${method}`
      )}
    </StyledButton>
  );
};

export default React.memo(SubmitBtn);

// Hook
// Component
import { useState, useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import GoogleBtn from "./GoogleBtn";
import TextDivider from "./TextDivider";
import InputField from "./InputField";
import SubmitBtn from "./SubmitBtn";
// API
import { googleAuth, Login, Register } from "../../../service/auth";
// utils
import {
  isValidNickname,
  isValidEmail,
  isValidPassword,
} from "../../../utils/isValid";

// 로그인, 회원가입 정보 state : joinInfo
// joinInfo의 초기값
const initialJoinInfo = {
  nickname: "",
  email: "",
  password: "",
};
// joinInfo의 valid state : joinInfoValid
// joinInfoValid의 초기값
const initialJoinInfoValid = {
  nickname: null,
  email: null,
  password: null,
};

const Form = ({ method }) => {
  const [joinInfo, setJoinInfo] = useState(initialJoinInfo);
  const [joinInfoValid, setJoinInfoValid] = useState(initialJoinInfoValid);

  // joinInfoValid 값 바뀔 때만, 제출 버튼 활성화 여부 재계산
  const disabled = useMemo(() => {
    // 회원 가입 + nickname 유효성 통과되지 않은 경우 -> disabled를 true로
    if (method === "회원 가입" && !joinInfoValid.nickname) return true;

    // nickname은 유효성 통과된 상태이고,
    // email, password까지 유효성 통과된 경우 -> disabled를 false로
    if (joinInfoValid.email && joinInfoValid.password) return false;

    // 하나라도 유효성이 통과되지 못한 경우 -> disabled를 true로
    return true;
  }, [joinInfoValid]);

  return (
    <Stack direction="column" spacing={3}>
      <GoogleBtn method={method} onClickGoogleAuth={googleAuth} />
      <TextDivider method={method} />
      {method === "회원 가입" && (
        <InputField
          fieldName="닉네임"
          value={joinInfo.nickname}
          setValue={setJoinInfo}
          validCheck={isValidNickname}
        />
      )}
      <InputField
        fieldName="이메일"
        value={joinInfo.email}
        setValue={setJoinInfo}
        validCheck={isValidEmail}
      />
      <InputField
        fieldName="비밀번호"
        fieldType="password"
        value={joinInfo.password}
        setValue={setJoinInfo}
        validCheck={isValidPassword}
        showValue={showValue}
        onClickShowBtn={() => setShowValue((prev) => !prev)}
      <SubmitBtn
        method={method}
        disabled={disabled}
        onClickSubmitBtn={
          method === "로그인"
            ? () => Login(joinInfo.email, joinInfo.password)
            : () =>
                Register(joinInfo.nickname, joinInfo.email, joinInfo.password)
        }
      />
    </Stack>
  );
};

export default Form;

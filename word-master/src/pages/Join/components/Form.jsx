// Hook
import { useState, useEffect } from "react";
// Component
import { Stack } from "@mui/material";
import GoogleBtn from "./GoogleBtn";
import TextDivider from "./TextDivider";
import InputField from "./InputField";
// API
import { googleAuth } from "../../../service/auth";
// utils
import {
  isValidNickname,
  isValidEmail,
  isValidPassword,
} from "../../../utils/isValid";

const Form = ({ method }) => {
  const [joinInfo, setJoinInfo] = useState({
    nickname: "",
    email: "",
    password: "",
  });
  const [showValue, setShowValue] = useState(false);

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
      />
    </Stack>
  );
};

export default Form;

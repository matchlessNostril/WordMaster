import { useState, useEffect, useMemo } from "react";
import { Stack } from "@mui/material";
import { GoogleBtn, TextDivider, InputField, SubmitBtn } from "./Form/index";
import { googleAuth, Login, Register } from "../../../service/auth";
import { isValidNickname, isValidEmail, isValidPassword } from "./isValid";

const initialJoinInfo = {
  nickname: "",
  email: "",
  password: "",
};

const initialJoinInfoValid = {
  nickname: null,
  email: null,
  password: null,
};

const Form = ({ method }) => {
  const [joinInfo, setJoinInfo] = useState(initialJoinInfo);
  const [joinInfoValid, setJoinInfoValid] = useState(initialJoinInfoValid);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  useEffect(() => {
    setJoinInfo(initialJoinInfo);
    setJoinInfoValid(initialJoinInfoValid);
    setIsPasswordVisible(false);
  }, [method]);

  // joinInfoValid 값 바뀔 때만, 제출 버튼 활성화 여부 재계산
  const disabled = useMemo(() => {
    // 회원 가입 + nickname 유효성 통과되지 않은 경우 -> disabled를 true로
    if (method === "会員登録" && !joinInfoValid.nickname) return true;

    // nickname은 유효성 통과된 상태이고,
    // email, password까지 유효성 통과된 경우 -> disabled를 false로
    if (joinInfoValid.email && joinInfoValid.password) return false;

    // 하나라도 유효성이 통과되지 못한 경우 -> disabled를 true로
    return true;
  }, [joinInfoValid]);

  return (
    <Stack
      direction="column"
      sx={{
        maxWidth: "90vw",
      }}
    >
      <GoogleBtn method={method} handleClick={googleAuth} />
      <TextDivider method={method} />
      <Stack direction="column" spacing={3}>
        {method === "会員登録" && (
          <InputField
            fieldName="ニックネーム"
            value={joinInfo.nickname}
            setValue={setJoinInfo}
            validCheck={isValidNickname}
            valid={joinInfoValid.nickname}
            setValid={setJoinInfoValid}
          />
        )}
        <InputField
          fieldName="メールアドレス"
          value={joinInfo.email}
          setValue={setJoinInfo}
          validCheck={isValidEmail}
          valid={joinInfoValid.email}
          setValid={setJoinInfoValid}
        />
        <InputField
          fieldName="パスワード"
          fieldType="password"
          value={joinInfo.password}
          setValue={setJoinInfo}
          validCheck={isValidPassword}
          valid={joinInfoValid.password}
          setValid={setJoinInfoValid}
          isPasswordVisible={isPasswordVisible}
          handleClickShowBtn={() => setIsPasswordVisible((prev) => !prev)}
        />
        <SubmitBtn
          {...{ method, disabled }}
          handleSubmit={
            method === "ログイン"
              ? () => Login(joinInfo.email, joinInfo.password)
              : () =>
                  Register(joinInfo.nickname, joinInfo.email, joinInfo.password)
          }
        />
      </Stack>
    </Stack>
  );
};

export default Form;

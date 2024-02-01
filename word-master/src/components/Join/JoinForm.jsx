// Hook
import { useState, useEffect } from "react";
// Styled-components
import styled from "styled-components";
// MUI
import { styled as muiStyled, useTheme } from "@mui/material/styles";
import { Stack, Button, Divider } from "@mui/material";
// Component
import JoinTextField from "./JoinTextField";
import JoinTextFieldSecret from "./JoinTextFieldSecret";
// utils
import {
  isValidNickname,
  isValidEmail,
  isValidPassword,
} from "../../utils/isValid";
// API
import { googleAuth, Login, Register } from "../../service/auth";

// 버튼 스타일드 컴포넌트
const StyledButton = muiStyled(Button)(({ theme }) => ({
  height: "50px",
  borderRadius: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
}));

// 구글 로고 아이콘 스타일드 컴포넌트
const GoogleIcon = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
`;

const JoinForm = ({ method }) => {
  // 가입 정보 state
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 제출 버튼 state
  const [canClickBtn, setCanClickBtn] = useState(false);

  // theme
  const theme = useTheme();

  // method 바뀔 때마다 joinInfo 초기화
  useEffect(() => {
    setNickname("");
    setEmail("");
    setPassword("");
  }, [method]);

  useEffect(() => {
    // "회원 가입"인데 닉네임이 빈 값이거나 유효성 검사를 통과하지 못한 경우
    if (
      method === "회원 가입" &&
      (!nickname || !isValidNickname(nickname).valid)
    ) {
      setCanClickBtn(false);
      return;
    }

    // 이메일 또는 비밀번호가 빈 값이거나 유효성 검사를 통과하지 못한 경우
    if (
      !email ||
      !isValidEmail(email).valid ||
      !password ||
      !isValidPassword(password).valid
    ) {
      setCanClickBtn(false);
      return;
    }

    // 모든 조건 통과시 버튼 클릭 가능
    setCanClickBtn(true);
  }, [method, nickname, email, password]);

  return (
    <>
      <Stack direction="column" spacing={3}>
        <StyledButton variant="outlined" theme={theme} onClick={googleAuth}>
          <GoogleIcon
            src={require("../../assets/icons/google.png")}
            alt="구글"
          />
          Google 계정으로 {method}
        </StyledButton>
        <Divider sx={{ p: 3, fontSize: "small" }}>이메일로 {method}</Divider>
        {method === "회원 가입" && (
          <JoinTextField
            value={nickname}
            setValue={setNickname}
            fieldName={"닉네임"}
            validationCheck={isValidNickname}
          ></JoinTextField>
        )}
        <JoinTextField
          value={email}
          setValue={setEmail}
          fieldName={"이메일"}
          validationCheck={isValidEmail}
        ></JoinTextField>
        <JoinTextFieldSecret
          value={password}
          setValue={setPassword}
          fieldName={"비밀번호"}
          validationCheck={isValidPassword}
        ></JoinTextFieldSecret>
        <StyledButton
          variant="contained"
          sx={{ mt: 5 }}
          disabled={!canClickBtn}
          onClick={
            method === "로그인"
              ? () => Login(email, password)
              : () => Register(nickname, email, password)
          }
        >
          {method}
        </StyledButton>
      </Stack>
    </>
  );
};

export default JoinForm;

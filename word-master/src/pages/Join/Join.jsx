// Hook
import { useState, useCallback } from "react";
// MUI
import { styled, useTheme } from "@mui/material/styles";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
// Component
import Transition from "../../components/Transition";
import JoinForm from "../../components/Join/JoinForm";
import Form from "./components/Form";

const StyledToggleButton = styled(ToggleButton)({
  fontSize: "1rem",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#535353",
  },
});

const Join = () => {
  // theme
  const theme = useTheme();

  // Join 방법 고르기
  const [method, setMethod] = useState("로그인");
  const handleClickToggle = useCallback((_, value) => {
    // 이미 선택된 ToggleButton을 누르면 value가 null이 됨
    if (!value) return;
    setMethod(value);
  }, []);

  return (
    <>
      <ToggleButtonGroup
        value={method}
        exclusive
        onChange={handleClickToggle}
        aria-label="로그인 혹은 회원가입 선택"
        sx={{
          mb: 7,
          [theme.breakpoints.down("sm")]: {
            width: "300px",
          },
          [theme.breakpoints.up("sm")]: {
            width: "400px",
          },
        }}
      >
        {/* 하위 컴포넌트에 모두 fullWidth를 넣음으로써 토글 요소 너비 일치 */}
        <StyledToggleButton value="로그인" fullWidth>
          로그인
        </StyledToggleButton>
        <StyledToggleButton value="회원 가입" fullWidth>
          회원 가입
        </StyledToggleButton>
      </ToggleButtonGroup>
      <JoinForm method={method} />
      <Form method={method} />
    </>
  );
};

export default Transition(Join);

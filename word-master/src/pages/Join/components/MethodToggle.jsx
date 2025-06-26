import { styled, useTheme } from "@mui/material/styles";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

const StyledToggleButton = styled(ToggleButton)({
  fontSize: "1rem",
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "white",
    backgroundColor: "#535353",
  },
});

const MethodToggle = ({ method, setMethod }) => {
  const theme = useTheme();

  return (
    <>
      <ToggleButtonGroup
        value={method}
        exclusive
        onChange={(_, value) => {
          // 이미 선택된 ToggleButton을 누르면 value가 null이 됨
          if (!value) return;
          setMethod(value);
        }}
        aria-label="ログインまたは会員登録選択"
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
        <StyledToggleButton value="ログイン" fullWidth>
          ログイン
        </StyledToggleButton>
        <StyledToggleButton value="会員登録" fullWidth>
          会員登録
        </StyledToggleButton>
      </ToggleButtonGroup>
    </>
  );
};

export default MethodToggle;

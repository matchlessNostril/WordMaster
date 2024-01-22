// Router
import { useNavigate } from "react-router-dom";
// Styled-components
import styled from "styled-components";
// MUI
import { useTheme } from "@mui/material";
import { Box, AppBar, Toolbar, Tooltip, IconButton } from "@mui/material";

// 로고 이미지
const Logo = styled.img`
  width: 40px;
  height: 40px;
`;

const TitleLogo = styled.img`
  width: auto;
  height: 40px;
`;

const Header = () => {
  // 테마 색
  const { primary } = useTheme().palette;
  // navigate
  const navigate = useNavigate();

  return (
    <>
      <Box component="header">
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: "white",
            borderBottom: `1px solid ${primary.light}`,
          }}
        >
          <Toolbar>
            {/* 
              variant : 텍스트 스타일과 크기를 지정
              sx : MUI 컴포넌트의 인라인 스타일 지정
              felxGrow : 남는 공간을 얼마나 가져가는지, 1이면 가능한 공간을 모두 가져감
            */}
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <IconButton onClick={() => navigate("/")}>
                <Logo src={require("../assets/images/logo.png")} alt="로고" />
              </IconButton>
              <Box
                sx={{
                  display: { xs: "none", sm: "block" },
                }}
              >
                <TitleLogo
                  src={require("../assets/images/titleLogo.png")}
                  alt="타이틀"
                />
              </Box>
            </Box>
            <Tooltip title="로그인">
              <IconButton
                onClick={() => {
                  navigate("/Join/Login");
                }}
                aria-label="로그인" // aria-label : 대체 텍스트
                disableTouchRipple // disableTouchRipple : 눌림 효과 비활성화
                sx={{
                  p: 1,
                  border: `1.3px solid ${primary.light}`,
                  borderRadius: "10px",
                  transition: "background-color 0.3s ease",
                  "&:active": {
                    backgroundColor: `${primary.main}`,
                  },
                }}
              >
                {/* 
                  MUI는 아이콘을 일반적으로 텍스트로 취급함.
                  따라서 아이콘 크기를 조정할 때 fontSize로 지정.
                */}
                <LoginIcon sx={{ fontSize: "15px" }} />
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;

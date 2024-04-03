import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, Tooltip, IconButton } from "@mui/material";
import { logout } from "../service/auth";

// 버튼 Icon
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun"; // 로그인
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople"; // 로그아웃
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore"; // 뒤로가기
import HomeIcon from "@mui/icons-material/Home"; // 홈
import CloseIcon from "@mui/icons-material/Close"; // 닫기

// currentPath 값에 따른 버튼 정보
/* prettier-ignore */
const btnInfoList = {
  "/": { title: "로그인", to: "/Join", icon: <DirectionsRunIcon /> },
  "/Join": { title: "뒤로 가기", to: "/", icon: <NavigateBeforeIcon /> },
  "/Main": { title: "로그아웃", to: logout, icon: <EmojiPeopleIcon /> }, // Main 화면에서만 화면 이동이 아닌 로그아웃
  "/VocaList": { title: "홈", to: "/Main", icon: <HomeIcon /> },
  "/SaveVoca": { title: "뒤로 가기", to: -1, icon: <NavigateBeforeIcon /> },
  "/Voca": { title: "뒤로 가기", to: -1, icon: <NavigateBeforeIcon /> },
  "/TestList": { title: "홈", to: "/Main", icon: <HomeIcon /> },
  "/CreateTest": { title: "뒤로 가기", to: "/TestList", icon: <NavigateBeforeIcon /> },
  "/SetTest": { title: "뒤로 가기", to: "/TestList", icon: <NavigateBeforeIcon /> },
  "/Test": { title: "테스트 종료", to: -1, icon: <CloseIcon /> },
};
/* prettier-ignore */

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [btnInfo, setBtnInfo] = useState({ title: "", to: "", icon: null });
  useEffect(() => {
    // SaveVoca (수정) 에서 Voca로 넘어온 경우
    // 뒤로 가기 버튼을 눌렀을 때 다시 SaveVoca로 넘어가기 때문에
    // to를 -3으로 바꿔 VocaList로 넘어갈 수 있도록
    console.log(location)
    if(location.pathname === "/Voca" && location.state.isAfterModify) {
      setBtnInfo({...btnInfoList[location.pathname], to: -3 })
      return;
    };
    setBtnInfo(btnInfoList[location.pathname]);
  }, [location]);

  return (
      <Box component="header">
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            backgroundColor: "white",
            borderBottom: `1px solid #dbdbdb`,
          }}
        >
          <Toolbar>
            {/* felxGrow : 남는 공간을 얼마나 가져가는지, 1이면 가능한 공간을 모두 가져감 */}
            <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
              <img
                src={require("../assets/images/logo.png")}
                alt="Word Master 로고"
                style={{ width: "40px", height: "22px" }}
              />
            </Box>
            <Tooltip title={btnInfo.title}>
              <IconButton
                onClick={location.pathname === "/Main" ? () => btnInfo.to() : () => navigate(btnInfo.to)}
                aria-label={btnInfo.title} // aria-label : 대체 텍스트
                disableTouchRipple // disableTouchRipple : 눌림 효과 비활성화
                sx={{
                  p: 1,
                  border: `1.3px solid #dbdbdb`,
                  borderRadius: "10px",
                  transition: "background-color 0.3s ease",
                  "&:active": {
                    backgroundColor: "#535353",
                  },
                }}
              >
                {btnInfo.icon}
              </IconButton>
            </Tooltip>
          </Toolbar>
        </AppBar>
      </Box>
  );
};

export default Header;

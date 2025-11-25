import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, AppBar, Toolbar, useTheme, Typography } from "@mui/material";
import { logout } from "../service/auth";
import GradientButton from "./GradientButton";

import StyleSharpIcon from "@mui/icons-material/StyleSharp";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";

const btnInfoList = {
  "/": {
    title: "ログイン",
    onText: true,
    to: "/Join",
    icon: <DirectionsRunIcon />,
  },
  "/Join": {
    title: "戻る",
    onText: false,
    to: "/",
    icon: <NavigateBeforeIcon />,
  },
  "/Main": {
    title: "ログアウト",
    onText: true,
    to: logout,
    icon: <EmojiPeopleIcon />,
  },
  "/VocaList": {
    title: "ホーム",
    onText: false,
    to: "/Main",
    icon: <HomeIcon />,
  },
  "/SaveVoca": {
    title: "戻る",
    onText: false,
    to: -1,
    icon: <NavigateBeforeIcon />,
  },
  "/Voca": {
    title: "戻る",
    onText: false,
    to: -1,
    icon: <NavigateBeforeIcon />,
  },
  "/TestList": {
    title: "ホーム",
    onText: false,
    to: "/Main",
    icon: <HomeIcon />,
  },
  "/CreateTest": {
    title: "戻る",
    onText: false,
    to: "/TestList",
    icon: <NavigateBeforeIcon />,
  },
  "/SetTest": {
    title: "戻る",
    onText: false,
    to: "/TestList",
    icon: <NavigateBeforeIcon />,
  },
  "/Test": {
    title: "テストを終了",
    onText: true,
    to: -1,
    icon: <CloseIcon />,
  },
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();

  const [btnInfo, setBtnInfo] = useState({ title: "", to: "", icon: null });
  useEffect(() => {
    if (location.pathname === "/Voca" && location.state.isAfterModify) {
      setBtnInfo({ ...btnInfoList[location.pathname], to: -3 });
      return;
    }
    setBtnInfo(btnInfoList[location.pathname]);
  }, [location]);

  return (
    <AppBar
      elevation={0}
      sx={{
        backgroundColor: `${theme.palette.slate[900]}80`,
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        borderBottom: `1px solid ${theme.palette.slate[700]}80`,
      }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1, gap: 1 }}>
          <StyleSharpIcon
            sx={{
              width: "30px",
              height: "30px",
              color: theme.palette.cyan[400],
            }}
          />
          <Typography
            variant="h6"
            sx={{
              color: theme.palette.textColors.slate100,
              fontWeight: "bold",
            }}
          >
            WM
          </Typography>
        </Box>

        <GradientButton
          onClick={
            location.pathname === "/Main"
              ? () => btnInfo.to()
              : () => navigate(btnInfo.to)
          }
          icon={btnInfo.icon}
          text={btnInfo.onText ? btnInfo.title : ""}
          aria-label={btnInfo.title}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Header;

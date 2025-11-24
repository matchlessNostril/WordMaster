import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Tooltip,
  Button,
  useTheme,
  Typography,
} from "@mui/material";
import { logout } from "../service/auth";

import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import HomeIcon from "@mui/icons-material/Home";
import CloseIcon from "@mui/icons-material/Close";
import AutoStoriesSharpIcon from "@mui/icons-material/AutoStoriesSharp";

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
  "/Test": { title: "テストを終了", onText: true, to: -1, icon: <CloseIcon /> },
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
    <Box component="header">
      <AppBar
        position="fixed"
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
            <AutoStoriesSharpIcon
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
          <Tooltip title={btnInfo.title}>
            <Button
              onClick={
                location.pathname === "/Main"
                  ? () => btnInfo.to()
                  : () => navigate(btnInfo.to)
              }
              aria-label={btnInfo.title}
              disableTouchRipple
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                backgroundImage: `linear-gradient(to right, ${theme.palette.cyan[500]}, ${theme.palette.blue[500]})`,
                color: "white",
                borderRadius: "8px",
                textTransform: "none",
                fontWeight: 500,
                transition: "all 0.3s ease",
                boxShadow: `0 10px 15px -3px ${theme.palette.cyan[500]}33, 0 4px 6px -2px ${theme.palette.cyan[500]}33`,
                "&:hover": {
                  backgroundImage: `linear-gradient(to right, ${theme.palette.cyan[600]}, ${theme.palette.blue[600]})`,
                  boxShadow: `0 10px 15px -3px ${theme.palette.cyan[500]}66, 0 4px 6px -2px ${theme.palette.cyan[500]}66`,
                },
                "& .MuiButton-startIcon": {
                  margin: 0,
                },
              }}
              startIcon={btnInfo.icon}
            >
              {btnInfo.onText && btnInfo.title}
            </Button>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;

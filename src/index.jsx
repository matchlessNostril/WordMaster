import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";

// theme
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#dbdbdb",
      main: "#535353",
      dark: "#303030",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#424a6f",
      contrastText: "#ffffff",
    },

    // new--------------------------------
    // 배경 색상 (Slate 계열)
    slate: {
      900: "#0f172a",
      800: "#1e293b",
      700: "#334155",
      600: "#475569",
      500: "#64748b",
    },
    // 텍스트 색상
    textColors: {
      slate100: "#f1f5f9", // 헤더 로고
      slate200: "#e2e8f0", // 타이틀, 카드 제목
      slate300: "#cbd5e1", // 그라데이션 일부
      slate400: "#94a3b8", // 서브텍스트, 설명
    },
    // 포인트 색상 (Cyan-Blue 그라데이션)
    cyan: {
      400: "#22d3ee",
      500: "#06b6d4",
      600: "#0891b2",
    },
    blue: {
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
    },
    // 서브 포인트 색상 (Purple-Pink 그라데이션)
    purple: {
      500: "#a855f7",
    },
    pink: {
      500: "#ec4899",
    },
    // Green 계열 (제거된 카드에 사용)
    green: {
      500: "#22c55e",
    },
    emerald: {
      500: "#10b981",
    },
    red: {
      400: "#ef4444",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </ThemeProvider>
);

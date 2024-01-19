import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

// theme
import { createTheme, ThemeProvider } from "@mui/material";

// roboto 폰트
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
      contrastText: "#404040",
    },
    secondary: {
      light: "#E7E7E7",
      main: "#B0B0B0",
      dark: "#3E3E3E",
      contrastText: "#ffffff",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

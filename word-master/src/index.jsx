import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

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

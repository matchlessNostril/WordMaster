import React from "react";
import { useTheme } from "@mui/material";
import StyleSharpIcon from "@mui/icons-material/StyleSharp";

const LargeLoading = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <div style={{ textAlign: "center" }}>
        {/* Animated Logo */}
        <div style={{ position: "relative", marginBottom: "2rem" }}>
          {/* Outer spinning ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "128px",
                height: "128px",
                borderRadius: "50%",
                border: `4px solid ${theme.palette.slate[700]}`,
                borderTopColor: theme.palette.cyan[500],
                animation: "spin 1s linear infinite",
              }}
            />
          </div>

          {/* Inner pulsing ring */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                width: "96px",
                height: "96px",
                borderRadius: "50%",
                border: `4px solid ${theme.palette.slate[700]}`,
                borderBottomColor: theme.palette.blue[500],
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
          </div>

          {/* Center icon */}
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "128px",
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundImage: `linear-gradient(to bottom right, ${theme.palette.cyan[500]}, ${theme.palette.blue[500]})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: `0 10px 15px -3px ${theme.palette.cyan[500]}80, 0 4px 6px -2px ${theme.palette.cyan[500]}80`,
                animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            >
              <StyleSharpIcon
                sx={{
                  width: "32px",
                  height: "32px",
                  color: "white",
                }}
              />
            </div>
          </div>
        </div>

        {/* Loading text */}
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <h2
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              backgroundImage: `linear-gradient(to right, ${theme.palette.textColors.slate200}, ${theme.palette.textColors.slate400})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              margin: 0,
            }}
          >
            Loading...
          </h2>
        </div>
      </div>

      <style>
        {`
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
          
          @keyframes bounce {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-25%);
            }
          }
        `}
      </style>
    </div>
  );
};

export default LargeLoading;

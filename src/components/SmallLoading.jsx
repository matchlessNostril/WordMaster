import React from "react";
import { useTheme } from "@mui/material";
import StyleSharpIcon from "@mui/icons-material/StyleSharp";

const SmallLoading = () => {
  const theme = useTheme();

  return (
    <div
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Outer ring */}
      <div
        style={{
          position: "absolute",
          width: "48px",
          height: "48px",
          borderRadius: "50%",
          border: `2px solid ${theme.palette.slate[700]}`,
          borderTopColor: theme.palette.cyan[500],
          animation: "spin 1s linear infinite",
        }}
      />
      {/* Inner icon */}
      <div
        style={{
          width: "24px",
          height: "24px",
          borderRadius: "50%",
          backgroundImage: `linear-gradient(to bottom right, ${theme.palette.cyan[500]}, ${theme.palette.blue[500]})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StyleSharpIcon
          sx={{
            width: "12px",
            height: "12px",
            color: "white",
          }}
        />
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
        `}
      </style>
    </div>
  );
};

export default SmallLoading;

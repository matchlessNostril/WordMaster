import React from "react";
import { useTheme, alpha } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

const ShowAnswerButton = ({ onClick }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "12px 0",
        width: "100%",
        flex: 1,
        minHeight: 0,
      }}
    >
      <button
        onClick={onClick}
        style={{
          width: "100%",
          height: "100%",
          padding: "12px 24px",
          borderRadius: "12px",
          backgroundColor: alpha(theme.palette.slate[700], 0.3),
          border: `1px solid ${alpha(theme.palette.slate[600], 0.5)}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = alpha(
            theme.palette.slate[700],
            0.5
          );
          e.currentTarget.style.borderColor = alpha(
            theme.palette.cyan[500],
            0.5
          );
          const iconBox = e.currentTarget.querySelector(".icon-box");
          const icon = e.currentTarget.querySelector(".icon");
          const text = e.currentTarget.querySelector(".text");
          if (iconBox) {
            iconBox.style.backgroundImage = `linear-gradient(to bottom right, ${alpha(
              theme.palette.cyan[500],
              0.2
            )}, ${alpha(theme.palette.blue[500], 0.2)})`;
          }
          if (icon) {
            icon.style.color = theme.palette.textColors.slate100;
          }
          if (text) {
            text.style.color = theme.palette.textColors.slate100;
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = alpha(
            theme.palette.slate[700],
            0.3
          );
          e.currentTarget.style.borderColor = alpha(
            theme.palette.slate[600],
            0.5
          );
          const iconBox = e.currentTarget.querySelector(".icon-box");
          const icon = e.currentTarget.querySelector(".icon");
          const text = e.currentTarget.querySelector(".text");
          if (iconBox) {
            iconBox.style.backgroundImage = `linear-gradient(to bottom right, ${theme.palette.slate[700]}, ${theme.palette.slate[600]})`;
          }
          if (icon) {
            icon.style.color = theme.palette.textColors.slate400;
          }
          if (text) {
            text.style.color = theme.palette.textColors.slate400;
          }
        }}
      >
        <div
          className="icon-box"
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "8px",
            backgroundImage: `linear-gradient(to bottom right, ${theme.palette.slate[700]}, ${theme.palette.slate[600]})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
          }}
        >
          <VisibilityOutlinedIcon
            className="icon"
            sx={{
              width: "20px",
              height: "20px",
              color: theme.palette.textColors.slate400,
              transition: "color 0.3s ease",
            }}
          />
        </div>
        <span
          className="text"
          style={{
            color: theme.palette.textColors.slate400,
            fontSize: "0.875rem",
            fontWeight: 500,
            transition: "color 0.3s ease",
          }}
        >
          答えを表示
        </span>
      </button>
    </div>
  );
};

export default React.memo(ShowAnswerButton);

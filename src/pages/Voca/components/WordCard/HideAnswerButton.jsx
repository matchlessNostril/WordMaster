import React from "react";
import { useTheme, alpha, useMediaQuery } from "@mui/material";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

const HideAnswerButton = ({ onClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const size = isMobile ? "24px" : "32px";
  const iconSize = isMobile ? "16px" : "20px";

  return (
    <button
      onClick={onClick}
      style={{
        width: size,
        height: size,
        borderRadius: "8px",
        backgroundImage: `linear-gradient(to bottom right, ${theme.palette.slate[700]}, ${theme.palette.slate[600]})`,
        border: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.3s ease",
        padding: 0,
      }}
      onMouseDown={(e) => {
        e.currentTarget.style.transform = "scale(0.98)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "transparent";
        const icon = e.currentTarget.querySelector(".icon");
        if (icon) {
          icon.style.color = theme.palette.textColors.slate100;
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundImage = `linear-gradient(to bottom right, ${theme.palette.slate[700]}, ${theme.palette.slate[600]})`;
        e.currentTarget.style.borderColor = alpha(
          theme.palette.slate[600],
          0.5
        );
        const icon = e.currentTarget.querySelector(".icon");
        if (icon) {
          icon.style.color = theme.palette.textColors.slate400;
        }
      }}
    >
      <VisibilityOffOutlinedIcon
        className="icon"
        sx={{
          width: iconSize,
          height: iconSize,
          color: theme.palette.textColors.slate400,
          transition: "color 0.3s ease",
        }}
      />
    </button>
  );
};

export default React.memo(HideAnswerButton);

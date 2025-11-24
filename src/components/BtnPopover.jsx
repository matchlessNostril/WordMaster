import React from "react";
import { Popover, Button, Box, useTheme } from "@mui/material";

const BtnPopover = ({
  anchor,
  setAnchor,
  buttons,
  orientation = "vertical",
}) => {
  const theme = useTheme();

  const getHoverStyle = (btn) => {
    const accent =
      btn?.hoverColor ||
      theme.palette?.cyan?.[400] ||
      theme.palette?.primary?.main ||
      "#06b6d4";

    return {
      backgroundColor: `${accent}1a`,
      color: accent,
    };
  };

  return (
    <>
      <Popover
        id="simple-popper"
        open={anchor ? true : false} // Anchor가 있다면 PopOver 열기
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        // PopOver 위치 하단 중앙으로
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        sx={{ marginTop: "4px" }}
        PaperProps={{
          sx: {
            backgroundColor: `${theme.palette.slate[800]}cc`,
            border: `1px solid ${theme.palette.slate[700]}80`,
            borderRadius: "16px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.35)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            overflow: "hidden",
            padding: "8px",
            width: "fit-content",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: orientation === "horizontal" ? "row" : "column",
            gap: "6px",
          }}
        >
          {buttons.map((button, index) => {
            const hoverStyle = getHoverStyle(button);
            return (
              <Button
                key={index}
                onClick={() => {
                  button.handleClick?.();
                  setAnchor(null);
                }}
                startIcon={button.icon || null}
                disableRipple
                sx={{
                  justifyContent: "flex-start",
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                  color: theme.palette.textColors.slate200,
                  backgroundColor: "transparent",
                  borderRadius: "12px",
                  paddingX: "14px",
                  paddingY: "12px",
                  transition: "all 0.2s ease",
                  gap: "12px",
                  "&:hover": hoverStyle,
                }}
              >
                {button.name}
              </Button>
            );
          })}
        </Box>
      </Popover>
    </>
  );
};

export default React.memo(BtnPopover);

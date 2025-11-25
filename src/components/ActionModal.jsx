import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import GradientButton from "./GradientButton";
import StyledTextField from "./StyledTextField";

const ActionModal = ({ open, setOpen, content }) => {
  const [value, setValue] = useState("");
  const theme = useTheme();
  useEffect(() => setValue(""), [open]);
  const hasContent = content?.textField || content?.children ? true : false;

  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "fixed",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            p: { xs: 2, sm: 4 },
            zIndex: 1200,
          }}
        >
          <Box
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(4px)",
            }}
          />
          <Box
            sx={{
              position: "relative",
              zIndex: 1,
              width: "fit-content",
              minWidth: theme.breakpoints.down("sm") ? 300 : 420,
              backgroundColor: alpha(theme.palette.slate[800], 0.95),
              borderRadius: "20px",
              border: `1px solid ${alpha(theme.palette.slate[700], 0.5)}`,
              boxShadow: "0 30px 60px -20px rgba(15, 23, 42, 0.7)",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 3,
                py: 2.5,
                borderBottom: hasContent
                  ? `1px solid ${alpha(theme.palette.slate[700], 0.5)}`
                  : "none",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 500,
                  color: theme.palette.textColors.slate100,
                }}
              >
                {content?.title}
              </Typography>
              <IconButton
                onClick={() => setOpen(false)}
                sx={{
                  color: theme.palette.textColors.slate300,
                  borderRadius: "12px",
                  "&:hover": {
                    backgroundColor: alpha(theme.palette.slate[700], 0.4),
                    color: theme.palette.textColors.slate100,
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>

            {hasContent && (
              <Box sx={{ px: 3, py: 2.5 }}>
                {content?.children}
                {content?.textField && (
                  <StyledTextField
                    labelText={content?.textField.label}
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    helperText={content?.textField.helperText}
                    placeholder={content?.textField.placeholder}
                  />
                )}
              </Box>
            )}

            {content?.btnName && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  px: 3,
                  py: 2.5,
                }}
              >
                <GradientButton
                  text={content?.btnName}
                  disabled={content?.textField && !value}
                  onClick={() =>
                    content?.textField
                      ? content.handleClickBtn(value)
                      : content.handleClickBtn()
                  }
                />
              </Box>
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default ActionModal;

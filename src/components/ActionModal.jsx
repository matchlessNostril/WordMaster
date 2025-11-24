import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, IconButton } from "@mui/material";
import { useTheme, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import GradientButton from "./GradientButton";

const ActionModal = ({ open, setOpen, content }) => {
  const [value, setValue] = useState("");
  const theme = useTheme();
  useEffect(() => setValue(""), [open]);

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
              width: "100%",
              maxWidth: 640,
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
                px: 4,
                py: 2,
                borderBottom: `1px solid ${alpha(
                  theme.palette.slate[700],
                  0.5
                )}`,
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

            <Box sx={{ px: 4, py: 3 }}>
              {content?.children}
              {content?.textField && (
                <TextField
                  label={`${content?.textField.label}`}
                  variant="filled"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                  autoComplete="off"
                  helperText={
                    "すでに存在する名前は作成できません。また、「 .  #  $  [  ] 」記号は入れられません。"
                  }
                  sx={{
                    width: "100%",
                    "& .MuiFilledInput-root": {
                      backgroundColor: alpha(theme.palette.slate[900], 0.3),
                      borderRadius: "12px",
                    },
                    "& .MuiFormHelperText-root": {
                      color: theme.palette.textColors.slate400,
                    },
                    "& label": {
                      color: theme.palette.textColors.slate300,
                    },
                  }}
                />
              )}
            </Box>

            {content?.btnName && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  px: 4,
                  py: 2,
                  borderTop: `1px solid ${alpha(
                    theme.palette.slate[700],
                    0.5
                  )}`,
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

import React from "react";
import { Box, TextField, useTheme, alpha } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TimerToggle = ({ timer, handleTimer }) => {
  const theme = useTheme();
  const isEnabled = timer.onTimer;

  return (
    <Box
      sx={{
        marginBottom: "32px",
        paddingBottom: "32px",
        borderBottom: `1px solid ${alpha(theme.palette.slate[700], 0.5)}`,
      }}
    >
      <Box
        onClick={() => handleTimer("ON")}
        sx={{
          padding: "20px",
          borderRadius: "12px",
          transition: "all 0.2s ease",
          border: `2px solid ${
            isEnabled
              ? alpha(theme.palette.purple[500], 0.5)
              : alpha(theme.palette.slate[600], 0.3)
          }`,
          backgroundImage: isEnabled
            ? `linear-gradient(to bottom right, ${alpha(
                theme.palette.purple[500],
                0.2
              )}, ${alpha(theme.palette.pink[500], 0.2)})`
            : `linear-gradient(to bottom right, ${alpha(
                theme.palette.slate[700],
                0.3
              )}, ${alpha(theme.palette.slate[700], 0.3)})`,
          backgroundColor: isEnabled
            ? "transparent"
            : alpha(theme.palette.slate[700], 0.3),
          cursor: "pointer",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                backgroundColor: isEnabled
                  ? alpha(theme.palette.purple[500], 0.3)
                  : alpha(theme.palette.slate[600], 0.5),
                color: isEnabled
                  ? theme.palette.purple[300]
                  : theme.palette.textColors.slate400,
              }}
            >
              <AccessTimeIcon
                sx={{
                  width: "20px",
                  height: "20px",
                  color: isEnabled
                    ? theme.palette.textColors.slate100
                    : theme.palette.textColors.slate400,
                }}
              />
            </Box>
            <Box>
              <Box
                sx={{
                  fontWeight: 600,
                  transition: "color 0.2s ease",
                  color: isEnabled
                    ? theme.palette.textColors.slate100
                    : theme.palette.textColors.slate300,
                }}
              >
                タイマー
              </Box>
            </Box>
          </Box>

          {/* Toggle Switch */}
          <Box
            sx={{
              position: "relative",
              width: "56px",
              height: "28px",
              borderRadius: "999px",
              transition: "all 0.3s ease",
              backgroundImage: isEnabled
                ? `linear-gradient(to right, ${theme.palette.purple[500]}, ${theme.palette.pink[500]})`
                : undefined,
              backgroundColor: isEnabled ? undefined : theme.palette.slate[600],
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: "4px",
                left: "4px",
                width: "20px",
                height: "20px",
                backgroundColor: "white",
                borderRadius: "50%",
                transition: "transform 0.3s ease",
                transform: isEnabled ? "translateX(28px)" : "translateX(0)",
              }}
            />
          </Box>
        </Box>

        {/* Timer Input - Shows when enabled */}
        {isEnabled && (
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: `1px solid ${alpha(theme.palette.purple[500], 0.2)}`,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <Box
                component="label"
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: theme.palette.textColors.slate300,
                }}
              >
                1問あたりの制限時間
              </Box>
              <TextField
                type="number"
                value={timer.time || ""}
                onChange={(event) => handleTimer("TIME", event.target.value)}
                inputProps={{
                  min: 1,
                  style: {
                    textAlign: "center",
                    padding: "8px 12px",
                  },
                }}
                sx={{
                  width: "80px",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: alpha(theme.palette.slate[700], 0.5),
                    border: `1px solid ${alpha(
                      theme.palette.purple[500],
                      0.3
                    )}`,
                    borderRadius: "8px",
                    color: theme.palette.textColors.slate200,
                    "&:hover": {
                      borderColor: alpha(theme.palette.purple[500], 0.5),
                    },
                    "&.Mui-focused": {
                      borderColor: alpha(theme.palette.purple[500], 0.5),
                      boxShadow: `0 0 0 2px ${alpha(
                        theme.palette.purple[500],
                        0.2
                      )}`,
                    },
                    "& fieldset": {
                      border: "none",
                    },
                    "& input[type='number']": {
                      MozAppearance: "textfield",
                      "&::-webkit-outer-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                      "&::-webkit-inner-spin-button": {
                        WebkitAppearance: "none",
                        margin: 0,
                      },
                    },
                  },
                }}
              />
              <Box
                sx={{
                  fontSize: "0.875rem",
                  color: theme.palette.textColors.slate400,
                }}
              >
                秒
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default React.memo(TimerToggle);

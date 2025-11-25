import React from "react";
import { Box, useTheme, alpha } from "@mui/material";

const TestTypeSelector = ({ value, onChange }) => {
  const theme = useTheme();

  const options = [
    {
      value: "word",
      label: "単語テスト",
      description: "単語を見て意味を答える形式",
    },
    {
      value: "mean",
      label: "意味テスト",
      description: "意味を見て単語を答える形式",
    },
  ];

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
        },
        gap: 2,
      }}
    >
      {options.map((option) => {
        const isSelected = value === option.value;
        return (
          <Box
            key={option.value}
            onClick={() => onChange(option.value)}
            sx={{
              padding: "20px",
              borderRadius: "12px",
              cursor: "pointer",
              transition: "all 0.2s ease",
              border: `2px solid ${
                isSelected
                  ? alpha(theme.palette.cyan[400], 0.5)
                  : alpha(theme.palette.slate[600], 0.3)
              }`,
              backgroundImage: isSelected
                ? `linear-gradient(to bottom right, ${alpha(
                    theme.palette.cyan[500],
                    0.2
                  )}, ${alpha(theme.palette.blue[500], 0.2)})`
                : `linear-gradient(to bottom right, ${alpha(
                    theme.palette.slate[700],
                    0.3
                  )}, ${alpha(theme.palette.slate[700], 0.3)})`,
              backgroundColor: isSelected
                ? "transparent"
                : alpha(theme.palette.slate[700], 0.3),
              "&:hover": {
                backgroundColor: isSelected
                  ? undefined
                  : alpha(theme.palette.slate[700], 0.5),
                borderColor: isSelected
                  ? alpha(theme.palette.cyan[400], 0.5)
                  : alpha(theme.palette.slate[600], 0.5),
              },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "flex-start",
                gap: 1.5,
              }}
            >
              <Box
                sx={{
                  marginTop: "2px",
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  border: `2px solid ${
                    isSelected
                      ? theme.palette.cyan[400]
                      : theme.palette.slate[500]
                  }`,
                  backgroundColor: isSelected
                    ? theme.palette.cyan[500]
                    : "transparent",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "all 0.2s ease",
                  flexShrink: 0,
                }}
              >
                {isSelected && (
                  <Box
                    sx={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "white",
                    }}
                  />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box
                  sx={{
                    fontWeight: 600,
                    marginBottom: "4px",
                    color: isSelected
                      ? theme.palette.textColors.slate100
                      : theme.palette.textColors.slate300,
                    transition: "color 0.2s ease",
                  }}
                >
                  {option.label}
                </Box>
                <Box
                  sx={{
                    fontSize: "0.875rem",
                    color: theme.palette.textColors.slate400,
                  }}
                >
                  {option.description}
                </Box>
              </Box>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default React.memo(TestTypeSelector);

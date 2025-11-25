import React from "react";
import { Box, Typography, useTheme, alpha } from "@mui/material";

const AnswerTable = ({ type, questionWord }) => {
  const theme = useTheme();
  const answerValue = type === "word" ? questionWord?.mean : questionWord?.word;

  const hasExplain =
    questionWord?.explain !== undefined &&
    questionWord?.explain !== null &&
    questionWord?.explain !== "";
  const hasPronunciation =
    questionWord?.pronunciation !== undefined &&
    questionWord?.pronunciation !== null &&
    questionWord?.pronunciation !== "";
  const hasExample =
    questionWord?.example !== undefined &&
    questionWord?.example !== null &&
    questionWord?.example !== "";
  const hasAdditionalInfo = hasExplain || hasPronunciation || hasExample;

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "16px",
        padding: "24px",
        overflowY: "auto",
        boxSizing: "border-box",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.slate[500], 0.5),
          borderRadius: "3px",
        },
      }}
    >
      {/* Answer Card */}
      <Box
        sx={{
          backgroundImage: `linear-gradient(to bottom right, ${alpha(
            theme.palette.cyan[500],
            0.2
          )}, ${alpha(theme.palette.blue[500], 0.2)})`,
          border: `2px solid ${alpha(theme.palette.cyan[500], 0.4)}`,
          borderRadius: "12px",
          padding: "16px 24px",
        }}
      >
        <Typography
          sx={{
            fontSize: "0.875rem",
            fontWeight: 600,
            color: theme.palette.cyan[400],
            marginBottom: "12px",
          }}
        >
          答え
        </Typography>
        <Typography
          sx={{
            fontSize: "1.5rem",
            color: theme.palette.textColors.slate100,
            whiteSpace: "pre-line",
            wordBreak: "break-word",
          }}
        >
          {answerValue || "-"}
        </Typography>
      </Box>

      {/* Additional Info Container */}
      {hasAdditionalInfo && (
        <Box
          sx={{
            backgroundColor: alpha(theme.palette.slate[700], 0.4),
            border: `1px solid ${alpha(theme.palette.slate[600], 0.6)}`,
            borderRadius: "12px",
            padding: "16px 24px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          {/* Explanation */}
          {hasExplain && (
            <Box>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: theme.palette.textColors.slate400,
                  marginBottom: "8px",
                }}
              >
                説明
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: theme.palette.textColors.slate200,
                  lineHeight: 1.75,
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {questionWord.explain}
              </Typography>
            </Box>
          )}

          {/* Pronunciation */}
          {hasPronunciation && (
            <Box>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: theme.palette.textColors.slate400,
                  marginBottom: "8px",
                }}
              >
                発音
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: theme.palette.textColors.slate200,
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {questionWord.pronunciation}
              </Typography>
            </Box>
          )}

          {/* Example */}
          {hasExample && (
            <Box>
              <Typography
                sx={{
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: theme.palette.textColors.slate400,
                  marginBottom: "8px",
                }}
              >
                例文
              </Typography>
              <Typography
                sx={{
                  fontSize: "1rem",
                  color: theme.palette.textColors.slate300,
                  lineHeight: 1.75,
                  whiteSpace: "pre-line",
                  wordBreak: "break-word",
                }}
              >
                {questionWord.example}
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default AnswerTable;

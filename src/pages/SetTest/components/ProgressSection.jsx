import React, { useState } from "react";
import {
  Box,
  useTheme,
  alpha,
  IconButton,
  CircularProgress,
} from "@mui/material";
import RotateLeftSharpIcon from "@mui/icons-material/RotateLeftSharp";
import operateData from "../../../service/database/operateData";
import { saveWordInTest } from "../../../utils/utils";
import { getList } from "../../../service/database/getList";

const ProgressItem = ({
  label,
  type,
  numOfPassed,
  listLength,
  isLoading,
  onReset,
  theme,
}) => {
  const percentage = Math.floor((numOfPassed / listLength) * 100);
  const isDisabled = !numOfPassed || isLoading;

  return (
    <Box sx={{ marginBottom: type === "word" ? "24px" : 0 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "12px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Box
            sx={{
              fontSize: "0.9rem",
              fontWeight: 500,
              color: theme.palette.textColors.slate300,
            }}
          >
            {label}テスト
          </Box>
          <IconButton
            onClick={onReset}
            disabled={isDisabled}
            sx={{
              padding: "6px",
              "&:hover:not(:disabled)": {
                backgroundColor: alpha(theme.palette.slate[700], 0.5),
              },
              "&:disabled": {
                opacity: 0.3,
              },
              transition: "all 0.2s ease",
            }}
            title="リセット"
          >
            {isLoading ? (
              <CircularProgress size={18} />
            ) : (
              <RotateLeftSharpIcon
                sx={{
                  width: "18px",
                  height: "18px",
                  color: isDisabled
                    ? theme.palette.slate[600]
                    : theme.palette.textColors.slate300,
                  transition: "color 0.2s ease",
                }}
              />
            )}
          </IconButton>
        </Box>
        <Box
          sx={{
            fontSize: "0.875rem",
            color: theme.palette.textColors.slate400,
          }}
        >
          {numOfPassed} / {listLength} ({percentage}%)
        </Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          height: "8px",
          backgroundColor: theme.palette.slate[700],
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            backgroundImage: `linear-gradient(to right, ${theme.palette.cyan[400]}, ${theme.palette.blue[500]})`,
            borderRadius: "999px",
            transition: "width 0.5s ease",
            width: `${percentage}%`,
          }}
        />
      </Box>
    </Box>
  );
};

const ProgressSection = ({
  title,
  wordRound,
  meanRound,
  numOfPassedWord,
  numOfPassedMean,
  wordListLength,
  setTestInfo,
}) => {
  const theme = useTheme();
  const [isLoadingWord, setIsLoadingWord] = useState(false);
  const [isLoadingMean, setIsLoadingMean] = useState(false);

  const handleReset = async (type) => {
    if (type === "word") {
      setIsLoadingWord(true);
    } else {
      setIsLoadingMean(true);
    }

    // 먼저 기존 진행률 데이터 삭제
    await operateData("REMOVE", `Test/${title}/wordList/${type}Test/waiting`);
    await operateData("REMOVE", `Test/${title}/wordList/${type}Test/passed`);

    // 리셋
    const paths = (await getList(`Test/${title}/paths`)).map(
      (path) => `Voca/root/${path}`
    );
    await saveWordInTest(title, paths, type);

    // 통과된 단어 수 수정
    if (type === "word") {
      setTestInfo((prev) => ({ ...prev, numOfPassedWord: 0 }));
      setIsLoadingWord(false);
    } else {
      setTestInfo((prev) => ({ ...prev, numOfPassedMean: 0 }));
      setIsLoadingMean(false);
    }
  };

  const progressItems = [
    {
      label: "単語",
      type: "word",
      numOfPassed: numOfPassedWord,
      isLoading: isLoadingWord,
      onReset: () => handleReset("word"),
    },
    {
      label: "意味",
      type: "mean",
      numOfPassed: numOfPassedMean,
      isLoading: isLoadingMean,
      onReset: () => handleReset("mean"),
    },
  ];

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px",
        }}
      >
        <strong
          style={{
            fontSize: "1.25rem",
            color: theme.palette.textColors.slate200,
            marginBottom: "8px",
          }}
        >
          達成率
        </strong>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              fontSize: "0.875rem",
              color: theme.palette.textColors.slate400,
              backgroundColor: alpha(theme.palette.slate[700], 0.5),
              padding: "4px 12px",
              borderRadius: "999px",
            }}
          >
            単語 {wordRound}回
          </Box>
          <Box
            sx={{
              fontSize: "0.875rem",
              color: theme.palette.textColors.slate400,
              backgroundColor: alpha(theme.palette.slate[700], 0.5),
              padding: "4px 12px",
              borderRadius: "999px",
            }}
          >
            意味 {meanRound}回
          </Box>
        </Box>
      </Box>

      {progressItems.map((item) => (
        <ProgressItem
          key={item.type}
          label={item.label}
          type={item.type}
          numOfPassed={item.numOfPassed}
          listLength={wordListLength}
          isLoading={item.isLoading}
          onReset={item.onReset}
          theme={theme}
        />
      ))}
    </Box>
  );
};

export default React.memo(ProgressSection);

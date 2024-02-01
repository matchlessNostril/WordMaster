// Hook
import { useState } from "react";
import { useLoading } from "../../../hooks";
// MUI
import {
  Stack,
  Box,
  Typography,
  Slider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
// API
import { getList } from "../../../service/database/getList";
import {
  pushData,
  removeData,
  updateData,
} from "../../../service/database/dataOperation";

const ProgressBar = ({ title, type, numOfPassed, listLength, setTestInfo }) => {
  const [onLoading, setOnLoading] = useLoading();

  // Slider 정보 State
  const [percentage, setPercentage] = useState(
    Math.floor((numOfPassed / listLength) * 100)
  );
  const [marks, setMarks] = useState([
    {
      value: percentage,
      label: numOfPassed.toString(),
    },
    {
      value: 100,
      label: listLength.toString(),
    },
  ]);

  // 리셋 함수
  const onClickResetBtn = async () => {
    setOnLoading(true);

    // 통과된 단어 리스트 불러오고 삭제
    const passedWordList = await getList(
      `Test/${title}/wordList/${type}Test/passed`
    );
    await removeData(`Test/${title}/wordList/${type}Test/passed`);

    // 대기 리스트로 이동
    for (let i = 0; i < passedWordList.length; i++) {
      await pushData(
        `Test/${title}/wordList/${type}Test/waiting`,
        passedWordList[i]
      );
    }

    // 통과된 단어 수 수정
    if (type === "word") {
      await updateData(`Test/${title}/info`, { numOfPassedWord: 0 });
      setTestInfo((prev) => ({ ...prev, numOfPassedWord: 0 }));
    } else {
      await updateData(`Test/${title}/info`, { numOfPassedMean: 0 });
      setTestInfo((prev) => ({ ...prev, numOfPassedMean: 0 }));
    }

    setOnLoading(false);
    setPercentage(0);
    setMarks((prev) => [{ value: 0, label: "0" }, prev[1]]);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: "100%",
        height: "70px",
      }}
    >
      <Box sx={{ mr: 2, width: "40px" }}>
        <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
          {`${type === "word" ? "단어" : "뜻"}\n(${percentage}%)`}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Slider
          value={percentage}
          marks={marks}
          disabled
          sx={{
            marginBottom: "-2.1vh",
            "&.Mui-disabled": { color: "#535353" },
            "& > .MuiSlider-thumb": {
              width: "15px",
              height: "15px",
              backgroundColor: "white",
              border: "2px solid #535353",
            },
            "& > .MuiSlider-markLabel": {
              top: "-1.3vh",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          ml: 2,
          width: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {onLoading ? (
          <CircularProgress size={20} />
        ) : (
          <IconButton onClick={onClickResetBtn} disabled={!numOfPassed}>
            <RestartAltIcon />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

export default ProgressBar;

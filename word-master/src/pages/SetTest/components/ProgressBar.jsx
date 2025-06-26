import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Slider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { getList } from "../../../service/database/getList";
import operateData from "../../../service/database/operateData";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const ProgressBar = ({ title, type, numOfPassed, listLength, setTestInfo }) => {
  const [isLoading, setIsLoading] = useState(false);
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

  const handleClickResetBtn = async () => {
    setIsLoading(true);

    // 통과된 단어 리스트 불러오고 삭제
    const passedWordList = await getList(
      `Test/${title}/wordList/${type}Test/passed`
    );
    await operateData("REMOVE", `Test/${title}/wordList/${type}Test/passed`);

    // 대기 리스트로 이동
    for (let i = 0; i < passedWordList.length; i++) {
      await operateData(
        "PUSH",
        `Test/${title}/wordList/${type}Test/waiting`,
        passedWordList[i]
      );
    }

    // 통과된 단어 수 수정
    if (type === "word") {
      await operateData("UPDATE", `Test/${title}/info`, { numOfPassedWord: 0 });
      setTestInfo((prev) => ({ ...prev, numOfPassedWord: 0 }));
    } else {
      await operateData("UPDATE", `Test/${title}/info`, { numOfPassedMean: 0 });
      setTestInfo((prev) => ({ ...prev, numOfPassedMean: 0 }));
    }

    setIsLoading(false);
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
          {`${type === "word" ? "単語" : "意味"}\n(${percentage}%)`}
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
        {isLoading ? (
          <CircularProgress size={20} />
        ) : (
          <IconButton onClick={handleClickResetBtn} disabled={!numOfPassed}>
            <RestartAltIcon />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

export default React.memo(
  ProgressBar,
  (prevProps, nextProps) =>
    prevProps.type === nextProps.type &&
    prevProps.numOfPassed === nextProps.numOfPassed &&
    prevProps.listLength &&
    nextProps.listLength
);

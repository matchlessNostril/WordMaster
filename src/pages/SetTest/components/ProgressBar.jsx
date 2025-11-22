import React, { useState } from "react";
import {
  Stack,
  Box,
  Typography,
  Slider,
  IconButton,
  CircularProgress,
} from "@mui/material";
import operateData from "../../../service/database/operateData";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { saveWordInTest } from "../../../utils/utils";
import { getList } from "../../../service/database/getList";

const ProgressBar = ({
  title,
  type,
  numOfPassed,
  listLength,
  setTestInfo,
  vocaPaths,
}) => {
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

    // 먼저 기존 진행률 데이터 삭제
    await operateData("REMOVE", `Test/${title}/wordList/${type}Test/waiting`);
    await operateData("REMOVE", `Test/${title}/wordList/${type}Test/passed`);

    // 리셋
    const vocaPaths = (await getList(`Test/${title}/paths`)).map(
      (path) => `Voca/root/${path}`
    );
    await saveWordInTest(title, vocaPaths, type);

    // 통과된 단어 수 수정
    if (type === "word") {
      setTestInfo((prev) => ({ ...prev, numOfPassedWord: 0 }));
    } else {
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

// Router
import { useSearchParams, useNavigate } from "react-router-dom";
// Hook
import { useState, useEffect } from "react";
// Custom Hook
import useLoading from "../../hooks/useLoading";
// MUI
import {
  Box,
  Divider,
  Typography,
  Stack,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  TextField,
  InputAdornment,
  Chip,
} from "@mui/material";
// Component
import SubHeader from "../../components/SubHeader";
import Loading from "../../components/Loading";
import ProgressBar from "../../components/Test/SetTest/ProgressBar";
// API
import { getData } from "../../service/database/dataOperation";
// Utils
import { isEmpty } from "lodash";

const SetTest = () => {
  // url 쿼리스트링에서 title 값 가져오기
  const [searchParams, _] = useSearchParams();
  const title = searchParams.get("title");

  // 테스트 정보 State
  const [testInfo, setTestInfo] = useState();
  // 테스트에 포함된 단어장 Path State
  const [vocaPaths, setVocaPaths] = useState();
  // 테스트 유형 (단어 / 뜻) 선택 Radio State
  const [radio, setRadio] = useState("word");
  // 타이머 State
  const [timer, setTimer] = useState({ onTimer: false, time: "" });

  // 로딩 State와 Setter
  const [onLoading, setOnLoading] = useLoading();

  // navigate
  const navigate = useNavigate();

  // 마운트 시, 데이터 불러오기
  useEffect(() => {
    setOnLoading(true);

    getData(`Test/${title}/info`)
      .then((info) => {
        setTestInfo(info);
      })
      .then(() => {
        return getData(`Test/${title}/paths`);
      })
      .then((paths) => {
        setVocaPaths(paths);
        setOnLoading(false);
      });
  }, []);

  useEffect(() => {
    console.log("vocaPaths :", vocaPaths);
  }, [vocaPaths]);

  return (
    <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
      <SubHeader
        title={title}
        disabled={
          !timer.onTimer || (typeof timer.time === "number" && timer.time > 0)
            ? false
            : true
        }
        btnName="시작"
        onClickHandler={() => navigate(`/Test?title=${title}`)}
      />
      <Divider sx={{ mt: 2, mb: 2 }} />
      {onLoading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ pl: 2 }}>
            <Typography variant="subtitle1">
              <strong>테스트 설정</strong>
            </Typography>
            <FormControl>
              <RadioGroup
                row
                value={radio}
                onChange={(event) => setRadio(event.target.value)}
              >
                <FormControlLabel
                  value="word"
                  control={<Radio />}
                  label="단어 테스트"
                />
                <FormControlLabel
                  value="mean"
                  control={<Radio />}
                  label="뜻 테스트"
                />
              </RadioGroup>
              <Stack direction="row">
                <FormControlLabel
                  control={
                    <Checkbox
                      onChange={() =>
                        setTimer((prev) => ({
                          ...prev,
                          onTimer: !prev.onTimer,
                        }))
                      }
                    />
                  }
                  label="타이머"
                />
                {timer.onTimer && (
                  <TextField
                    variant="standard"
                    onChange={(event) =>
                      setTimer((prev) => ({
                        ...prev,
                        time: parseInt(event.target.value),
                      }))
                    }
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">(초)</InputAdornment>
                      ),
                    }}
                    sx={{ marginLeft: "10px" }}
                  />
                )}
              </Stack>
            </FormControl>
          </Box>
          <Divider sx={{ mt: 2, mb: 2 }} />
          {!isEmpty(testInfo) && (
            <Box sx={{ pl: 2 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="subtitle1">
                  <strong>현재 달성률</strong>
                </Typography>
                <Chip
                  label={`단어 ${testInfo.wordRound}회독 중`}
                  size="small"
                />
                <Chip label={`뜻 ${testInfo.meanRound}회독 중`} size="small" />
              </Stack>
              <Stack mt={1}>
                <ProgressBar
                  title={title}
                  type="단어"
                  // numOfPassed={testInfo.numOfPassedWord}
                  listLength={testInfo.wordListLength}
                />
                <ProgressBar
                  title={title}
                  type="뜻"
                  // numOfPassed={testInfo.numOfPassedMean}
                  listLength={testInfo.wordListLength}
                />
              </Stack>
            </Box>
          )}
          <Divider sx={{ mt: 2, mb: 2 }} />
        </>
      )}
    </Box>
  );
};

export default SetTest;

import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
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
import { Transition, SubHeader, Loading, ScrollList } from "../../components";
import ProgressBar from "../../components/Test/SetTest/ProgressBar";
import VocaPathListItem from "../../components/Test/SetTest/VocaPathListItem";
import operateData from "../../service/database/operateData";
import { getList } from "../../service/database/getList";
import { isEmpty } from "lodash";

const SetTest = () => {
  // url 쿼리스트링에서 title 값 가져오기
  const [searchParams, _] = useSearchParams();
  const title = searchParams.get("title");

  // 테스트 정보 State
  const [testInfo, setTestInfo] = useState({});
  // 테스트에 포함된 단어장 Path State
  const [vocaPaths, setVocaPaths] = useState([]);
  // 테스트 유형 (단어 / 뜻) 선택 Radio State
  const [radio, setRadio] = useState("word");
  // 타이머 State
  const [timer, setTimer] = useState({ onTimer: false, time: "" });

  // 로딩 State와 Setter
  const [isLoading, setIsLoading] = useState(false);

  // navigate
  const navigate = useNavigate();

  // 마운트 시, 데이터 불러오기
  useEffect(() => {
    setIsLoading(true);

    operateData("GET", `Test/${title}/info`)
      .then((info) => {
        setTestInfo(info);
      })
      .then(() => {
        return getList(`Test/${title}/paths`);
      })
      .then((paths) => {
        // path가 같은 단어장끼리 분류
        let newVocaPaths = [];
        let isExistingPath, lastSlashIndex, dirPath, vocaName;
        for (let i = 0; i < paths.length; i++) {
          isExistingPath = false;
          lastSlashIndex = paths[i].lastIndexOf("/");
          dirPath = paths[i].slice(0, lastSlashIndex);
          vocaName = paths[i].slice(lastSlashIndex + 1, paths[i].length);

          for (let j = 0; j < newVocaPaths.length; j++) {
            if (newVocaPaths[j].dirPath === dirPath) {
              newVocaPaths[j].vocaList.push(vocaName);
              isExistingPath = true;
              break;
            }
          }

          if (!isExistingPath) {
            newVocaPaths.push({ dirPath, vocaList: [vocaName] });
          }
        }

        setVocaPaths(newVocaPaths);
        setIsLoading(false);
      });
  }, []);

  const onClickStartBtn = useCallback(() => {
    if (
      radio === "word" &&
      testInfo.numOfPassedWord === testInfo.wordListLength
    ) {
      alert(
        "현재 단어 테스트 달성률이 100%입니다. 단어 테스트를 새로 진행하고 싶다면, 리셋 버튼을 눌러주세요."
      );
      return;
    }
    if (
      radio === "mean" &&
      testInfo.numOfPassedMean === testInfo.wordListLength
    ) {
      alert(
        "현재 뜻 테스트 달성률이 100%입니다. 뜻 테스트를 새로 진행하고 싶다면, 리셋 버튼을 눌러주세요."
      );
      return;
    }

    navigate("/Test", {
      state: {
        title: title,
        type: radio,
        timer,
        initialNumOfPassed:
          radio === "word"
            ? testInfo.numOfPassedWord
            : testInfo.numOfPassedMean,
        listLength: testInfo.wordListLength,
        round: radio === "word" ? testInfo.wordRound : testInfo.meanRound,
      },
    });
  }, [testInfo, radio, timer]);

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
        onClickHandler={onClickStartBtn}
      />
      <Divider sx={{ mt: 2, mb: 2 }} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Box sx={{ pl: 1 }}>
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
                    autoComplete="off"
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
            <Box sx={{ pl: 1 }}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="subtitle1">
                  <strong>현재 달성률</strong>
                </Typography>
                <Chip label={`단어 ${testInfo.wordRound}회독`} size="small" />
                <Chip label={`뜻 ${testInfo.meanRound}회독`} size="small" />
              </Stack>
              <Stack mt={1}>
                <ProgressBar
                  title={title}
                  type="word"
                  numOfPassed={testInfo.numOfPassedWord}
                  listLength={testInfo.wordListLength}
                  setTestInfo={setTestInfo}
                />
                <ProgressBar
                  title={title}
                  type="mean"
                  numOfPassed={testInfo.numOfPassedMean}
                  listLength={testInfo.wordListLength}
                  setTestInfo={setTestInfo}
                />
              </Stack>
            </Box>
          )}
          <Divider sx={{ mt: 2, mb: 2 }} />
          <Box sx={{ pl: 1, maxWidth: "85vw" }}>
            <Typography variant="subtitle1">
              <strong>단어장 리스트</strong>
            </Typography>
            <ScrollList maxHeight="25vh">
              {vocaPaths.length > 0 &&
                vocaPaths.map((value, index) => (
                  <VocaPathListItem
                    key={index}
                    dirPath={value.dirPath}
                    vocaList={value.vocaList}
                  />
                ))}
            </ScrollList>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Transition(SetTest);

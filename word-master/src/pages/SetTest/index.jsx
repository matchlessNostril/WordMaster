import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { Transition, SubHeader, Loading, Divider } from "../../components";
import { Form, AchievementRate, ProgressBar, VocaList } from "./components";
import operateData from "../../service/database/operateData";
import { getList } from "../../service/database/getList";
import { isEmpty } from "lodash";

const SetTest = () => {
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams();
  const title = searchParams.get("title");

  const [isLoading, setIsLoading] = useState(false);
  const [testInfo, setTestInfo] = useState({});
  const [vocaPaths, setVocaPaths] = useState([]);
  const [radio, setRadio] = useState("word");
  const [timer, setTimer] = useState({ onTimer: false, time: "" });

  useEffect(() => {
    setIsLoading(true);

    operateData("GET", `Test/${title}/info`)
      .then((info) => {
        setTestInfo(info);
      })
      .then(() => getList(`Test/${title}/paths`))
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

  const handleClickStartBtn = useCallback((testInfo, radio, timer) => {
    const {
      numOfPassedWord,
      numOfPassedMean,
      wordListLength,
      wordRound,
      meanRound,
    } = testInfo;

    if (radio === "word" && numOfPassedWord === wordListLength) {
      alert(
        "현재 단어 테스트 달성률이 100%입니다. 단어 테스트를 새로 진행하고 싶다면, 리셋 버튼을 눌러주세요."
      );
      return;
    }
    if (radio === "mean" && numOfPassedMean === wordListLength) {
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
          radio === "word" ? numOfPassedWord : numOfPassedMean,
        listLength: wordListLength,
        round: radio === "word" ? wordRound : meanRound,
      },
    });
  }, []);

  const handleRadio = useCallback((value) => {
    setRadio(value);
  }, []);

  const handleTimer = useCallback((type, value = null) => {
    switch (type) {
      case "ON":
        setTimer((prev) => ({
          ...prev,
          onTimer: !prev.onTimer,
        }));
        break;
      case "TIME":
        setTimer((prev) => ({
          ...prev,
          time: parseInt(value),
        }));
    }
  }, []);

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
        handleClickBtn={() => handleClickStartBtn(testInfo, radio, timer)}
      />
      <Divider margin={2} />
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <Form {...{ radio, handleRadio, timer, handleTimer }} />
          <Divider margin={2} />
          {!isEmpty(testInfo) && (
            <Box sx={{ pl: 1 }}>
              <AchievementRate
                wordRound={testInfo.wordRound}
                meanRound={testInfo.meanRound}
              />
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
          <Divider margin={2} />
          <VocaList {...{ vocaPaths }} />
        </>
      )}
    </Box>
  );
};

export default Transition(SetTest);

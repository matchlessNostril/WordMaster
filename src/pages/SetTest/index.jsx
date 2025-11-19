import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { Transition, SubHeader, Loading, Divider } from "../../components";
import { Form, AchievementRate, ProgressBar, VocaList } from "./components";
import operateData from "../../service/database/operateData";
import { getList } from "../../service/database/getList";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";

const getLengthOfwordList = (wordList) => {
  if (wordList === null) return 0;
  return Object.values(wordList)
    .map(({ addressList }) => addressList)
    .flat().length;
};

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

    const fetchTestData = async () => {
      try {
        const [info, paths, wordWaitingList, wordPassedList, meanPassedList] =
          await Promise.all([
            operateData("GET", `Test/${title}/info`),
            getList(`Test/${title}/paths`),
            operateData("GET", `Test/${title}/wordList/wordTest/waiting`),
            operateData("GET", `Test/${title}/wordList/wordTest/passed`),
            operateData("GET", `Test/${title}/wordList/meanTest/passed`),
          ]);

        const numOfWaitingWord = getLengthOfwordList(wordWaitingList);
        const numOfPassedWord = getLengthOfwordList(wordPassedList);
        const numOfPassedMean = getLengthOfwordList(meanPassedList);
        const wordListLength = numOfWaitingWord + numOfPassedWord;

        // 테스트 기본 정보
        setTestInfo({
          ...info,
          numOfPassedWord,
          numOfPassedMean,
          wordListLength,
        });

        // path가 같은 단어장끼리 분류
        let newVocaPaths = [{ dirPath: null, vocaList: [] }];
        let isExistingPath, lastSlashIndex, dirPath, vocaName;
        for (let i = 0; i < paths.length; i++) {
          isExistingPath = false;
          lastSlashIndex = paths[i].lastIndexOf("/");

          if (lastSlashIndex === -1) {
            newVocaPaths[0].vocaList.push(paths[i]);
            continue;
          }

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
      } catch (error) {
        console.error("테스트 정보를 불러오는 중 오류가 발생했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestData();
  }, [title]);

  const handleClickStartBtn = useCallback((testInfo, radio, timer) => {
    const {
      numOfPassedWord,
      numOfPassedMean,
      wordListLength,
      wordRound,
      meanRound,
    } = testInfo;

    if (radio === "word" && numOfPassedWord === wordListLength) {
      toast.info(
        "現在の単語テストの達成率は100%です。単語テストを新しく始めたい場合は、リセットボタンを押してください。"
      );
      return;
    }
    if (radio === "mean" && numOfPassedMean === wordListLength) {
      toast.info(
        "現在の意味テストの達成率は100%です。意味テストを新しく始めたい場合は、リセットボタンを押してください。"
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
        btnName="スタート"
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

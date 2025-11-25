import { useState, useCallback, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Box, useTheme } from "@mui/material";
import {
  Transition,
  SubHeader,
  LargeLoading,
  StyledCard,
  ProgressSection,
} from "../../components";
import { Form, VocaList } from "./components";
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
  const theme = useTheme();
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
        console.error("テスト情報の取得に失敗しました。", error);
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
        "単語テストの達成率は100%です。単語テストを新しく始めたい場合は、リセットボタンを押してください。"
      );
      return;
    }
    if (radio === "mean" && numOfPassedMean === wordListLength) {
      toast.info(
        "意味テストの達成率は100%です。意味テストを新しく始めたい場合は、リセットボタンを押してください。"
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
    <>
      {isLoading ? (
        <LargeLoading />
      ) : (
        <Box
          sx={{
            width: "100vw",
            [theme.breakpoints.down("sm")]: { height: "90vh" },
            [theme.breakpoints.up("sm")]: {
              height: "85vh",
            },
            overflowY: "scroll",
            mt: 2,
            display: "flex",
            justifyContent: "center",
            "&::-webkit-scrollbar": {
              width: "10px",
              height: "10px",
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: theme.palette.slate[600],
              borderRadius: "12px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              backgroundColor: theme.palette.slate[500],
            },
            "&::-webkit-scrollbar-track": {
              backgroundColor: theme.palette.slate[800],
              borderRadius: "12px",
            },
          }}
        >
          <Box
            component="section"
            sx={{
              [theme.breakpoints.down("sm")]: { width: "90vw" },
              [theme.breakpoints.up("sm")]: {
                width: "75vw",
              },
            }}
          >
            <div style={{ marginBottom: "20px" }}>
              <SubHeader
                title={title}
                disabled={
                  !timer.onTimer ||
                  (typeof timer.time === "number" && timer.time > 0)
                    ? false
                    : true
                }
                btnName="スタート"
                handleClickBtn={() =>
                  handleClickStartBtn(testInfo, radio, timer)
                }
              />
            </div>

            <div
              style={{
                padding: "0 10px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <StyledCard maxHeight="">
                <Form {...{ radio, handleRadio, timer, handleTimer }} />
                {!isEmpty(testInfo) && (
                  <Box sx={{ pl: 1 }}>
                    <ProgressSection
                      title={title}
                      wordRound={testInfo.wordRound}
                      meanRound={testInfo.meanRound}
                      numOfPassedWord={testInfo.numOfPassedWord}
                      numOfPassedMean={testInfo.numOfPassedMean}
                      wordListLength={testInfo.wordListLength}
                      setTestInfo={setTestInfo}
                    />
                  </Box>
                )}
              </StyledCard>
              <VocaList {...{ vocaPaths }} />
            </div>
          </Box>
        </Box>
      )}
    </>
  );
};

export default Transition(SetTest);

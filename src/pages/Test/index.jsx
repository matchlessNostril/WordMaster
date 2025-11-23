import { useState, useRef, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useQuestionReducer from "./useQuestionReducer";
import { useMediaQuery, Stack } from "@mui/material";
import { Transition, Loading, TextChip } from "../../components";
import { Progress, QuestionCard, NextBtns } from "./components";
import operateData from "../../service/database/operateData";
import { shuffle } from "lodash";
import { Box } from "@mui/system";
import { toast } from "react-toastify";

const Test = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const navigate = useNavigate();
  const location = useLocation();
  const {
    title,
    type,
    timer: { onTimer, time },
    initialNumOfPassed,
    listLength,
    round,
  } = location.state;

  const [isLoading, setIsLoading] = useState(false);
  const [currentListLength, setCurrentListLength] = useState(listLength);
  const { question, questionDispatch } = useQuestionReducer();
  const [showAnswer, setShowAnswer] = useState(false);
  const [questionTimer, setQuestionTimer] = useState(time);
  const timerId = useRef(null);

  const startTimer = useCallback(() => {
    setQuestionTimer(time);
    timerId.current = setInterval(
      () => setQuestionTimer((prev) => prev - 1),
      1000
    );
  }, []);

  // 0. 마운트 시, wordList 불러와 question State 초기화
  useEffect(() => {
    setIsLoading(true);

    const initQuestions = async () => {
      try {
        const waitingList = await operateData(
          "GET",
          `Test/${title}/wordList/${type}Test/waiting`
        );

        const shuffledWordList = shuffle(
          Object.entries(waitingList || {}).flatMap(
            ([testWordPathKey, { path, addressList }]) =>
              addressList.map((address) => ({
                testWordPathKey,
                vocaPath: path,
                wordAddress: address,
              }))
          )
        );

        const firstWord = await operateData(
          "GET",
          `${shuffledWordList[0].vocaPath}/${shuffledWordList[0].wordAddress}`
        );

        questionDispatch({
          type: "INIT",
          initialState: {
            index: 0,
            waitingQuestionList: shuffledWordList,
            currentQuestion: {
              wordAddress: shuffledWordList[0].wordAddress,
              word: firstWord,
              vocaPath: shuffledWordList[0].vocaPath,
              testWordPathKey: shuffledWordList[0].testWordPathKey,
            },
            numOfPassed: initialNumOfPassed,
          },
        });

        // 타이머 설정되어 있으면, 시작
        if (onTimer) startTimer();
      } catch (error) {
        console.error("単語一覧を読み込めませんでした。", error);
      } finally {
        setIsLoading(false);
      }
    };

    initQuestions();
  }, []);

  // 타이머가 0초가 되면 clearInterval
  useEffect(() => {
    if (questionTimer === 0) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }, [questionTimer]);

  // 1. 통과
  const handleClickPassBtn = useCallback(
    async (question) => {
      // 타이머가 설정되어 있었다면, 중단
      if (onTimer) clearInterval(timerId.current);

      // DB 상에서 waitng에 있는 해당 word를 passed로 이동
      // question.currentQuestion[0] : Voca에서 word address key 값
      // question.currentQuestion[1] : value
      // question.currentQuestion[2] : Voca에서 path 값
      // question.currentQuestion[3] : Test word에서 path key 값
      const { wordAddress, word, vocaPath, testWordPathKey } =
        question.currentQuestion;

      const [prevWaitingAddressList, prevPassedAddressList] = await Promise.all(
        [
          operateData(
            "GET",
            `Test/${title}/wordList/${type}Test/waiting/${testWordPathKey}/addressList`
          ),
          operateData(
            "GET",
            `Test/${title}/wordList/${type}Test/passed/${testWordPathKey}/addressList`
          ),
        ]
      );
      const newWaitingAddressList = prevWaitingAddressList.filter(
        (address) => address !== wordAddress
      );
      const newPassedAddressList = [
        ...(prevPassedAddressList ?? []),
        wordAddress,
      ];

      Promise.all([
        operateData(
          "SET",
          `Test/${title}/wordList/${type}Test/waiting/${testWordPathKey}/addressList`,
          newWaitingAddressList
        ),
        operateData(
          "SET",
          `Test/${title}/wordList/${type}Test/passed/${testWordPathKey}`,
          {
            path: vocaPath,
            addressList: newPassedAddressList,
          }
        ),
        operateData(
          "UPDATE",
          `Test/${title}/info`,
          type === "word"
            ? { numOfPassedWord: question.numOfPassed + 1 }
            : { numOfPassedMean: question.numOfPassed + 1 }
        ),
      ]);

      // 마지막 문제 통과 였다면, 라운드 1 증가 + 화면 이동
      if (question.numOfPassed + 1 === currentListLength) {
        await operateData(
          "UPDATE",
          `Test/${title}/info`,
          type === "word" ? { wordRound: round + 1 } : { meanRound: round + 1 }
        );

        // 다시 SetTest 화면으로 이동
        navigate(`/SetTest?title=${title}`);
        toast.success("テストを完了しました。");
        return;
      }

      // 뒷면일 때 다음 버튼을 누르면 다음 문제 답이 잠깐 보이고 넘어가는 현상을 막기 위해
      // 먼저 showAnswer를 false로
      setShowAnswer(false);

      // State 업데이트
      questionDispatch({ type: "CORRECT" });

      // 타이머 설정되어 있었다면, 재시작
      if (!onTimer) return;
      startTimer();
    },
    [currentListLength]
  );

  // 2. 실패 (= 틀림, 시간 초과)
  const handleClickFailBtn = useCallback(() => {
    // 타이머가 설정되어 있었고 아직 중단되지 않았다면, 중단
    if (onTimer && timerId.current) clearInterval(timerId.current);

    setShowAnswer(false);

    // State 업데이트
    questionDispatch({ type: "INCORRECT" });

    // 타이머 설정되어 있었다면, 재시작
    if (!onTimer) return;
    startTimer();
  }, []);

  // 3. 다음 문제 불러오기
  useEffect(() => {
    if (!question.currentQuestion.wordAddress) return;

    if (question.index === -1) {
      navigate(`/SetTest?title=${title}`);
      toast.success("テストを完了しました。");
      return;
    }

    const fetchNextQuestion = async () => {
      try {
        const { wordAddress, vocaPath } = question.currentQuestion;
        const nextWord = await operateData("GET", `${vocaPath}/${wordAddress}`);
        questionDispatch({ type: "SET_NEW_WORD", newWord: nextWord });
      } catch (error) {
        console.error("次の問題を読み込めませんでした。", error);
      }
    };

    fetchNextQuestion();
  }, [question.index]);

  return (
    <>
      {isLoading ? (
        <Loading onMarginTop={false} />
      ) : (
        <Stack spacing={2} sx={{ width: isPortrait ? "80vw" : "50vw" }}>
          {question.numOfPassed !== null && (
            <Progress
              numOfPassed={question.numOfPassed}
              {...{ type, listLength: currentListLength }}
            />
          )}
          <QuestionCard
            {...{ type, showAnswer, setShowAnswer }}
            question={question.currentQuestion}
            questionDispatch={questionDispatch}
            setCurrentListLength={setCurrentListLength}
          />
          <Box
            sx={{
              fontSize: "0.8rem",
              color: "#999",
              backgroundColor: "#f0f0f0",
              p: 0.5,
              borderRadius: 1,
            }}
          >
            出典 : {question.currentQuestion.vocaPath.split("Voca/root/")[1]}
          </Box>
          <Stack
            direction="row"
            justifyContent={onTimer ? "space-between" : "flex-end"}
          >
            {onTimer && (
              <TextChip
                label={`${questionTimer}`}
                sx={
                  questionTimer === 0 && {
                    color: "white",
                    backgroundColor: "#ff6c6c",
                  }
                }
              />
            )}
            <NextBtns
              handleClickPassBtn={() => handleClickPassBtn(question)}
              {...{ handleClickFailBtn }}
              isTimeOut={questionTimer === 0}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Transition(Test);

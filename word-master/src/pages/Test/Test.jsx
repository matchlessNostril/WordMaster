// Router
import { useLocation, useNavigate } from "react-router-dom";
// Hook
import { useState, useRef, useCallback, useEffect } from "react";
// Custom Hook
import { useIsPortrait, useLoading } from "../../hooks";
// Reducer
import useQuestionReducer from "./useQuestionReducer";
// MUI
import { Stack } from "@mui/material";
// Component (Common)
import { Transition, Loading } from "../../components";
// Component (for Test Page)
import { Progress, QuestionCard, Timer, NextBtns } from "./components";
// API
import {
  getData,
  setData,
  removeData,
  updateData,
} from "../../service/database/dataOperation";
// Utils
import { shuffle } from "lodash";

const Test = () => {
  // location.state
  const location = useLocation();
  const {
    title,
    type,
    timer: { onTimer, time },
    initialNumOfPassed,
    listLength,
    round,
  } = location.state;

  // State
  const { question, questionDispatch } = useQuestionReducer();
  const [questionTimer, setQuestionTimer] = useState(time);
  const [onLoading, setOnLoading] = useLoading();

  // Ref
  const timerId = useRef(null);

  // MediaQuery
  const isPortrait = useIsPortrait();
  // Navigate
  const navigate = useNavigate();

  // Timer 초기화 후 시작 함수
  const startTimer = useCallback(() => {
    setQuestionTimer(time);
    timerId.current = setInterval(
      () => setQuestionTimer((prev) => prev - 1),
      1000
    );
  }, []);

  // 마운트 시, wordList 불러와 question State 초기화
  useEffect(() => {
    setOnLoading(true);

    getData(`Test/${title}/wordList/${type}Test/waiting`)
      .then((wordList) => {
        // 객체 → 배열화 + 셔플
        const shuffledWordList = shuffle(Object.entries(wordList));

        questionDispatch({
          type: "INIT",
          initialState: {
            waitingQuestionList: shuffledWordList,
            currentQuestion: shuffledWordList[0],
            numOfPassed: initialNumOfPassed,
          },
        });
      })
      .then(() => setOnLoading(false))
      .then(() => {
        // 타이머 설정되어 있으면, 시작
        if (!onTimer) return;
        startTimer();
      });
  }, []);

  // 타이머가 0초가 되면 clearInterval
  useEffect(() => {
    if (questionTimer === 0) {
      clearInterval(timerId.current);
      timerId.current = null;
    }
  }, [questionTimer]);

  // 버튼 클릭 함수 1. 통과
  const onClickPassBtn = useCallback(async () => {
    // 타이머가 설정되어 있었다면, 중단
    if (onTimer) clearInterval(timerId.current);

    // DB 상에서 waitng에 있는 해당 word를 passed로 이동
    await removeData(
      `Test/${title}/wordList/${type}Test/waiting/${question.currentQuestion[0]}`
    );
    await setData(
      `Test/${title}/wordList/${type}Test/passed/${question.currentQuestion[0]}`,
      question.currentQuestion[1]
    );

    // 통과된 수 1 증가
    await updateData(
      `Test/${title}/info`,
      type === "word"
        ? { numOfPassedWord: question.numOfPassed + 1 }
        : { numOfPassedMean: question.numOfPassed + 1 }
    );

    // 마지막 문제 통과 였다면, 라운드 1 증가 + 화면 이동
    if (question.numOfPassed + 1 === listLength) {
      await updateData(
        `Test/${title}/info`,
        type === "word" ? { wordRound: round + 1 } : { meanRound: round + 1 }
      );

      // 다시 SetTest 화면으로 이동
      navigate(`/SetTest?title=${title}`);
      return;
    }

    // State 업데이트
    questionDispatch({ type: "CORRECT" });

    // 타이머 설정되어 있었다면, 재시작
    if (!onTimer) return;
    startTimer();
  }, [question]);

  // 버튼 클릭 함수 2. 실패 (= 틀림, 시간 초과)
  const onClickFailBtn = useCallback(() => {
    // 타이머가 설정되어 있었고 아직 중단되지 않았다면, 중단
    if (onTimer && timerId.current) clearInterval(timerId.current);

    // State 업데이트
    questionDispatch({ type: "INCORRECT" });

    // 타이머 설정되어 있었다면, 재시작
    if (!onTimer) return;
    startTimer();
  }, []);

  return (
    <>
      {onLoading ? (
        <Loading onMarginTop={false} />
      ) : (
        <Stack spacing={2} sx={{ width: isPortrait ? "80vw" : "50vw" }}>
          {question.numOfPassed !== null && (
            <Progress
              numOfPassed={question.numOfPassed}
              {...{ type, listLength }}
            />
          )}
          {question.currentQuestion && (
            <QuestionCard
              questionWord={question.currentQuestion[1]}
              {...{ type }}
            />
          )}
          <Stack
            direction="row"
            justifyContent={onTimer ? "space-between" : "flex-end"}
          >
            {onTimer && <Timer {...{ questionTimer }} />}
            <NextBtns
              {...{ onClickPassBtn, onClickFailBtn }}
              isTimeOut={questionTimer === 0}
            />
          </Stack>
        </Stack>
      )}
    </>
  );
};

export default Transition(Test);

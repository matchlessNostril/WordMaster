import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return action.initialState;
    case "CORRECT": {
      let newWaitingQuestionList;

      if (state.waitingQuestionList.length === 2) {
        // 2개였는데 맞혔다면 마지막 남은 요소만
        newWaitingQuestionList = [state.waitingQuestionList[1]];
      } else {
        // 나머지
        newWaitingQuestionList = [...state.waitingQuestionList];
        newWaitingQuestionList.shift();
      }

      const currentQuestion = [
        state.waitingQuestionList[1].wordAddress,
        null,
        state.waitingQuestionList[1].vocaPath,
        state.waitingQuestionList[1].testWordPathKey,
      ];

      return {
        waitingQuestionList: newWaitingQuestionList,
        currentQuestion,
        numOfPassed: state.numOfPassed + 1,
      };
    }
    case "INCORRECT": {
      const currentListLength = state.waitingQuestionList.length;

      // 1개였는데 틀리면 그대로
      if (currentListLength === 1) return state;

      let newWaitingQuestionList;
      if (currentListLength === 2) {
        // 2개였는데 틀리면 순서만 바꿈
        newWaitingQuestionList = [
          state.waitingQuestionList[1],
          state.waitingQuestionList[0],
        ];
      } else {
        // 나머지
        const randomIndex = Math.floor(Math.random() * currentListLength);
        const wrongQuestion = state.waitingQuestionList[0];
        newWaitingQuestionList = [...state.waitingQuestionList];
        newWaitingQuestionList.shift();
        newWaitingQuestionList.splice(randomIndex, 0, wrongQuestion);
      }

      const currentQuestion = [
        state.waitingQuestionList[1].wordAddress,
        null,
        state.waitingQuestionList[1].vocaPath,
        state.waitingQuestionList[1].testWordPathKey,
      ];

      return {
        waitingQuestionList: newWaitingQuestionList,
        currentQuestion,
        numOfPassed: state.numOfPassed,
      };
    }
    case "SET_NEXT_WORD": {
      const [wordAddress, _word, vocaPath, testWordPathKey] =
        state.currentQuestion;
      return {
        ...state,
        currentQuestion: [
          wordAddress,
          action.nextWord,
          vocaPath,
          testWordPathKey,
        ],
      };
    }
    default:
      console.error(`올바르지 않은 타입입니다 : ${action.type}`);
      return state;
  }
};

const useQuestionReducer = () => {
  const [question, questionDispatch] = useReducer(reducer, {
    waitingQuestionList: null,
    currentQuestion: [null, null, null, null],
    numOfPassed: null,
  });

  return { question, questionDispatch };
};

export default useQuestionReducer;

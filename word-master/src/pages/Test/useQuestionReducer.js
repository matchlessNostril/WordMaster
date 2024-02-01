import { useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "CORRECT": {
      const newWaitingQuestionList = [...state.waitingQuestionList];
      newWaitingQuestionList.shift();

      console.log("CORRECT return :", {
        waitingQuestionList: newWaitingQuestionList,
        currentQuestion: state.waitingQuestionList[1],
        numOfPassed: state.numOfPassed + 1,
      });

      return {
        waitingQuestionList: newWaitingQuestionList,
        currentQuestion: state.waitingQuestionList[1],
        numOfPassed: state.numOfPassed + 1,
      };
    }
    case "INCORRECT": {
      const currentListLength = state.waitingQuestionList.length;
      const randomIndex = Math.floor(Math.random() * currentListLength);
      const wrongQuestion = state.waitingQuestionList[0];
      const newWaitingQuestionList = [...state.waitingQuestionList];
      newWaitingQuestionList.shift();
      newWaitingQuestionList.splice(randomIndex, 0, wrongQuestion);

      console.log("INCORRECT return :", {
        waitingQuestionList: newWaitingQuestionList,
        currentQuestion: state.waitingQuestionList[1],
        numOfPassed: state.numOfPassed,
      });

      return {
        waitingQuestionList: newWaitingQuestionList,
        currentQuestion: state.waitingQuestionList[1],
        numOfPassed: state.numOfPassed,
      };
    }
    case "INIT":
      return action.initialState;
    default:
      console.error(`올바르지 않은 타입입니다 : ${action.type}`);
      return state;
  }
};

const useQuestionReducer = () => {
  const [question, questionDispatch] = useReducer(reducer, {
    waitingQuestionList: null,
    currentQuestion: null,
    numOfPassed: null,
  });

  return { question, questionDispatch };
};

export default useQuestionReducer;

import { useReducer } from "react";

const initialWord = {
  word: "",
  mean: "",
};

const initialWordList = [initialWord];

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_WORD_LIST":
      return action.wordList;
    case "ADD_WORD":
      return [...state, initialWord];
    case "DELETE_WORD": {
      if (state.length === 1) {
        alert("단어를 최소한 1개 이상 등록해야 합니다.");
        return state;
      }
      return [...state.filter((_, index) => index !== action.index)];
    }
    case "UPDATE_PROP":
      return [
        ...state.slice(0, action.index),
        { ...state[action.index], [action.propName]: action.value },
        ...state.slice(action.index + 1),
      ];
    case "CLICK_CHECKBOX": {
      let word = { ...state[action.index] };

      // pronunciation이라는 속성이 이미 있었으면 체크박스 체크되어 있던 것
      const isChecked = word.hasOwnProperty("pronunciation");

      if (isChecked) {
        const { pronunciation, ...rest } = word;
        word = rest;
      } else {
        // pronunciation 속성 추가
        word.pronunciation = "";
      }

      return [
        ...state.slice(0, action.index),
        word,
        ...state.slice(action.index + 1),
      ];
    }
    default:
      return state;
  }
};

const useWordListReducer = () => {
  const [wordList, wordListDispatch] = useReducer(reducer, initialWordList);

  return { wordList, wordListDispatch };
};

export default useWordListReducer;

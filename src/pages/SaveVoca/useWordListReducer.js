import { useReducer } from "react";

const initialWord = {
  word: "",
  mean: "",
};

const initialWordList = [initialWord];

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_LIST":
      return action.wordList;
    case "ADD":
      return [...state, initialWord];
    case "REMOVE": {
      if (state.length === 1) {
        alert("単語を最低1つ以上登録する必要があります。");
        return state;
      }
      return [...state.filter((_, index) => index !== action.index)];
    }
    case "UPDATE":
      return [
        ...state.slice(0, action.index),
        { ...state[action.index], [action.propName]: action.value },
        ...state.slice(action.index + 1),
      ];
    case "CHECK": {
      let word = { ...state[action.index] };

      // pronunciation이라는 속성이 이미 있었으면 체크박스 체크되어 있던 것
      const isChecked = word.hasOwnProperty(action.propName);

      if (isChecked) {
        const { [action.propName]: _, ...rest } = word;
        word = rest;
      } else {
        // [action.propName] 속성 추가
        word[action.propName] = "";
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

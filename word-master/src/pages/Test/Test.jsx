// Router
import { useLocation } from "react-router-dom";
// Hook
import { useState, useEffect } from "react";
// API
import { getData } from "../../service/database/dataOperation";

const Test = () => {
  // location.state로 전달된 state 값 불러오기
  const location = useLocation();
  const { title, type, timer, numOfPassed, listLength } = location.state;

  // wordList State
  const [wordList, setWordList] = useState([]);

  // 마운트 시 wordList 불러오기
  useEffect(() => {
    console.log("title :", title);
    console.log("type :", type);
    console.log("timer :", timer);
    console.log("numOfPassed :", numOfPassed);
    console.log("listLength :", listLength);

    getData(`Test/${title}/wordList/${type}Test/waiting`).then(
      (waitingWordList) => {
        console.log(Object.entries(waitingWordList));
        // 배열화 하여 저장
        setWordList(Object.entries(waitingWordList));
      }
    );
  }, []);

  return <>Test</>;
};

export default Test;

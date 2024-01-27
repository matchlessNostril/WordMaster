// Router
import { useLocation, useNavigate } from "react-router-dom";
// Hook
import { useState, useCallback, useEffect } from "react";
// Custom Hook
import useLoading from "../../hooks/useLoading";
import useWordListReducer from "../../hooks/useWordListReducer";
// MUI
import { Box, TextField, ListItem, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Component
import SubHeader from "../../components/SubHeader";
import Loading from "../../components/Loading";
import WordCard from "../../components/Voca/SaveVoca/WordCard";
// Layout
import ScrollList from "../../layout/ScrollList";
// API
import {
  setData,
  pushData,
  removeData,
} from "../../service/database/dataOperation";
// utils
import { getList } from "../../service/database/getList";

const SaveVoca = () => {
  // location.state로 전달된 mode, path, title, key 값 불러오기
  const location = useLocation();
  const mode = location.state.mode;
  const path = location.state.path;
  const title = location.state.hasOwnProperty("title")
    ? location.state.title
    : "";
  const key = location.state?.key;

  // 단어장 이름 State
  const [vocaName, setVocaName] = useState(title);

  // 단어 리스트 State와 Dispatch
  const { wordList, wordListDispatch } = useWordListReducer();

  // 로딩 State와 Setter
  const [onLoading, setOnLoading] = useLoading();

  // Modify(수정) 모드인 경우, 마운트 시 데이터 불러오기
  useEffect(() => {
    if (mode !== "Modify") return;

    setOnLoading(true);
    // useEffect에서 콜백 함수에 async, await를 사용하는 것은 불가능하지만, then은 가능
    getList(`Voca/${path}/${title}`).then((originalWordList) => {
      wordListDispatch({ type: "FETCH_WORD_LIST", wordList: originalWordList });
      setOnLoading(false);
    });
  }, []);

  // navigate
  const navigate = useNavigate();

  // 만들기 버튼 핸들러 함수
  const onCreateBtnHandler = useCallback(() => {
    // 제대로 입력되지 않은 단어가 있는지 먼저 확인
    let isValid = true;
    for (let i = 0; i < wordList.length; i++) {
      for (const propName in wordList[i]) {
        if (!wordList[i][propName]) {
          const printPropName =
            propName === "word" ? "단어" : propName === "mean" ? "뜻" : "발음";
          alert(
            `${
              i + 1
            }번 단어에서 ${printPropName} 부분이 아직 입력되지 않았습니다.`
          );
          isValid = false;
          break;
        }
      }
      if (!isValid) break;
    }
    if (!isValid) return;

    // Modify(수정) 모드인 경우 먼저 기존 데이터 삭제
    if (mode === "Modify") {
      // 기존 단어 리스트 삭제
      removeData(`Voca/${path}/${title}`);
      // 기존 단어장 이름 수정, key 바뀌지 않게
      setData(`Voca/${path}/vocaList/${key}`, { name: vocaName });
    }

    // 데이터 저장
    wordList.forEach((word) => pushData(`Voca/${path}/${vocaName}`, word));
    // Create(생성) 모드인 경우 vocaList에도 저장하고 화면 이동
    if (mode === "Create") {
      pushData(`Voca/${path}/vocaList`, { name: vocaName });
      // 전달 State 바뀌지 않음
      navigate(-1);
      return;
    }

    // Modify(수정) 모드에서는 Voca 화면으로 이동 하기 때문에, 바뀐 State로 전달해야 함
    navigate("/Voca", {
      state: {
        key: key,
        title: vocaName,
        path: path,
      },
    });
  }, [vocaName, wordList]);

  return (
    <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
      <SubHeader
        title={mode === "Modify" ? "단어장 수정" : "단어장 만들기"}
        disabled={vocaName ? false : true}
        btnName={mode === "Modify" ? "수정" : "만들기"}
        onClickHandler={onCreateBtnHandler}
      />
      <ScrollList>
        <ListItem>
          <TextField
            label="단어장 이름"
            variant="outlined"
            value={vocaName}
            onChange={(event) => setVocaName(event.target.value)}
            sx={{ width: "100%" }}
          />
        </ListItem>
        {onLoading ? (
          <Loading />
        ) : (
          <>
            {wordList.map((word, index) => (
              <WordCard
                key={index}
                index={index}
                word={word}
                wordListDispatch={wordListDispatch}
              />
            ))}

            <ListItem sx={{ display: "flex", justifyContent: "center" }}>
              <IconButton
                onClick={() => wordListDispatch({ type: "ADD_WORD" })}
              >
                <AddCircleIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </ListItem>
          </>
        )}
      </ScrollList>
    </Box>
  );
};

export default SaveVoca;

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
import Transition from "../../components/Transition";
import SubHeader from "../../components/SubHeader";
import Loading from "../../components/Loading";
import WordCard from "../../components/Voca/SaveVoca/WordCard";
// Layout
import ScrollList from "../../layout/ScrollList";
// API
import { getList } from "../../service/database/getList";
import {
  setData,
  pushData,
  removeData,
} from "../../service/database/dataOperation";

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

  // 만들기, 수정 버튼 핸들러 함수
  const onClickCreateBtn = useCallback(async () => {
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

    // Create(생성) 모드 또는 Modify(수정) 모드에서 기존 단어장 이름이 아닐 경우 유효성 검사
    if (mode === "Create" || vocaName !== title) {
      // 단어장 이름에 포함될 수 없는 문자가 있는 지 확인
      if (/[.#$\[\]]/.test(vocaName)) {
        alert(`이름에 '.', '#', '$', '[', ']' 기호는 들어갈 수 없습니다.`);
        return;
      }

      // 버튼 클릭 시점의 현재 path의 dirList와 vocaList 배열 값 불러오기
      const dirList = await getList(`Voca/${path}/dirList`, "name");
      const vocaList = await getList(`Voca/${path}/vocaList`, "name");
      const entireList = dirList.concat(vocaList);

      // 현재 디렉토리 내에서 중복된 이름으로 생성 불가능
      if (entireList.includes(vocaName)) {
        alert(
          `현재 폴더 내에 이미 존재하는 이름으로는 ${
            mode === "Modify" ? "수정" : "생성"
          }할 수 없습니다.`
        );
        return;
      }
    }

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
        isAfterModify: true,
      },
    });
  }, [vocaName, wordList]);

  return (
    <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
      <SubHeader
        title={mode === "Modify" ? "단어장 수정" : "단어장 만들기"}
        disabled={vocaName ? false : true}
        btnName={mode === "Modify" ? "수정" : "만들기"}
        onClickHandler={onClickCreateBtn}
      />
      <ScrollList maxHeight="75vh">
        <ListItem>
          <TextField
            label="단어장 이름"
            variant="outlined"
            value={vocaName}
            onChange={(event) => setVocaName(event.target.value)}
            autoComplete="off"
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
                focus={index === wordList.length - 1}
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

export default Transition(SaveVoca);

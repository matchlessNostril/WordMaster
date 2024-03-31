import { useNavigate } from "react-router-dom";
import React, {
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from "react";
import {
  VocaPathContext,
  VocaPathProvider,
} from "../../contexts/VocaPathContext";
import {
  Stack,
  Checkbox,
  Button,
  Box,
  TextField,
  Divider,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import {
  Transition,
  SubHeader,
  Loading,
  NoFile,
  ScrollList,
} from "../../components";
import { getList } from "../../service/database/getList";
import operateData from "../../service/database/operateData";
import listObjToArr from "../../utils/listObjToArr";

// ul, 스타일드 컴포넌트
const StyledUl = styled.ul`
  padding-left: 1rem;
  max-width: 80vw;

  & > li {
    font-size: 0.9rem;
  }
  & > li::marker {
    font-size: 10px;
  }
`;

// 디렉토리 or 단어장 체크 박스 컴포넌트
const SetCheckbox = React.memo(
  ({ index, isDir = false, name, path, currentTree }) => {
    // VocaPathContext에서 모든 단어장 Path 배열, 선택된 단어장 Path 배열 State와 Setter 함수 불러오기
    const { allVocaPaths, selectedVocaPaths, setSelectedVocaPaths } =
      useContext(VocaPathContext);

    // 체크박스 체크 State
    const [checked, setChecked] = useState(false);
    // 체크박스 일부 체크 State
    const [indeterminate, setIndeterminate] = useState(false);
    // 디렉토리 트리 열기 State
    const [openDir, setOpenDir] = useState(false);

    // Memoized 현재 Path 디렉토리 리스트, 단어장 리스트
    const dirList = useMemo(
      () => listObjToArr(currentTree, "dirList"),
      [currentTree]
    );
    const vocaList = useMemo(
      () => listObjToArr(currentTree, "vocaList"),
      [currentTree]
    );
    // Memoized 하위 단어장 Path
    const allSubVocaPaths = useMemo(
      () => allVocaPaths.filter((value) => value.includes(`${path}/${name}/`)),
      [allVocaPaths]
    );

    // selectedVocaPaths 바뀔 대마다 체크박스 체크, 일부 체크 State 초기화
    useEffect(() => {
      if (!isDir) {
        setChecked(selectedVocaPaths.includes(`${path}/${name}`));
        return;
      }

      if (allSubVocaPaths.length === 0) return;

      // selectedVocaPaths 중에 allSubVocaPaths에 해당하는 것이 몇 개 있는 지
      const numOfSelectedSub = allSubVocaPaths.filter((value) =>
        selectedVocaPaths.includes(value)
      ).length;

      // 0개라면 미체크 (= 전체 미선택)
      if (numOfSelectedSub === 0) {
        setChecked(false);
        setIndeterminate(false);
        return;
      }

      // allSubVocaPaths의 길이와 같다면 체크 (= 전체 선택)
      if (numOfSelectedSub === allSubVocaPaths.length) {
        setChecked(true);
        setIndeterminate(false);
        return;
      }

      // 그 사이라면 반체크 (= 일부 선택)
      setChecked(true);
      setIndeterminate(true);
    }, [selectedVocaPaths, allSubVocaPaths]);

    // 단어장 체크박스 체크 함수: 해당 path만 추가, 제거
    const onCheckVoca = useCallback(() => {
      setChecked((prev) => !prev);
      setSelectedVocaPaths((prev) => {
        if (prev.includes(`${path}/${name}`)) {
          return [...prev.filter((value) => value !== `${path}/${name}`)];
        } else {
          return [...prev, `${path}/${name}`];
        }
      });
    }, []);

    // 디렉토리 체크박스 체크 함수: 하위 path 모두 추가, 제거
    const onCheckDir = useCallback(() => {
      if (allSubVocaPaths.length === 0) return;
      setChecked((prev) => !prev);

      if (!checked) {
        // 추가
        setSelectedVocaPaths((prev) => [
          ...new Set([...prev, ...allSubVocaPaths]),
        ]);
      } else {
        // 제거
        setSelectedVocaPaths((prev) => [
          ...prev.filter((value) => !allSubVocaPaths.includes(value)),
        ]);
      }
    }, [checked]);

    return (
      <>
        <Stack direction="row" sx={{ ml: index * 4 }}>
          <Checkbox
            checked={checked}
            onChange={isDir ? onCheckDir : onCheckVoca}
            disabled={isDir && allSubVocaPaths.length === 0}
            indeterminate={indeterminate}
          />
          <Button
            onClick={isDir ? () => setOpenDir((prev) => !prev) : onCheckVoca}
            startIcon={
              <img
                src={
                  !isDir
                    ? require("../../assets/icons/document.png")
                    : openDir
                    ? require("../../assets/icons/folder_opened.png")
                    : require("../../assets/icons/folder_closed.png")
                }
                style={{
                  width: "20px",
                  height: "20px",
                }}
              />
            }
            // minWidth를 unset로 해야 startIcon과 내부 Text를 모두 감쌀 수 있음
            sx={{ whiteSpace: "nowrap", minWidth: "unset" }}
          >
            {name}
          </Button>
        </Stack>
        {isDir && openDir && (
          <>
            {dirList &&
              dirList.map((value, key) => (
                <ChildSetCheckbox
                  key={key}
                  index={index + 1}
                  isDir
                  name={value}
                  path={`${path}/${name}`}
                  currentTree={currentTree[value]}
                />
              ))}
            {vocaList &&
              vocaList.map((value, key) => (
                <ChildSetCheckbox
                  key={key}
                  index={index + 1}
                  name={value}
                  path={`${path}/${name}`}
                />
              ))}
          </>
        )}
      </>
    );
  }
);

const ChildSetCheckbox = React.memo(
  ({ index, isDir = false, name, path, currentTree = null }) => {
    return (
      <SetCheckbox
        index={index}
        isDir={isDir}
        name={name}
        path={path}
        currentTree={currentTree}
      />
    );
  }
);

const CreateTest = () => {
  // VocaPathContext에서 사용자의 Voca JSON Tree, 선택된 단어장 Path 배열 State 불러오기
  const { vocaTree, selectedVocaPaths } = useContext(VocaPathContext);

  // 테스트 이름 State
  const [testName, setTestName] = useState();

  // Memoized 루트 디렉토리 리스트, 단어장 리스트
  const dirList = useMemo(() => listObjToArr(vocaTree, "dirList"), [vocaTree]);
  const vocaList = useMemo(
    () => listObjToArr(vocaTree, "vocaList"),
    [vocaTree]
  );

  // 로딩 State와 Setter
  const [isLoading, setIsLoading] = useState(false);

  // navigate
  const navigate = useNavigate();

  // 테스트 만들기 함수
  const onClickCreateBtn = useCallback(async () => {
    // 테스트 이름에 포함될 수 없는 문자가 있는 지 확인
    if (/[.#$\[\]]/.test(testName)) {
      alert(`이름에 「 .  #  $  [  ] 」 기호는 들어갈 수 없습니다.`);
      return;
    }

    // 버튼 클릭 시점의 testList 배열 값 불러오기
    const testList = await getList("Test/testList", "name");

    // 중복된 이름으로 생성 불가능
    if (testList.includes(testName)) {
      alert(`이미 존재하는 이름으로는 생성할 수 없습니다.`);
      return;
    }

    // DB 저장 시작 시, 로딩 On
    setIsLoading(true);

    // TestList에 저장
    await operateData("PUSH", "Test/testList", { name: testName });

    // 선택된 Path 저장하면서, 해당하는 단어 리스트 불러오기
    let wordList = [];
    for (let i = 0; i < selectedVocaPaths.length; i++) {
      // "Voca/root" 이후 문자열 저장
      await operateData(
        "PUSH",
        `Test/${testName}/paths`,
        selectedVocaPaths[i].slice(10)
      );
      wordList = wordList.concat(await getList(selectedVocaPaths[i]));
    }

    // 기본 정보 저장
    await operateData("SET", `Test/${testName}/info`, {
      wordListLength: wordList.length,
      numOfPassedWord: 0,
      numOfPassedMean: 0,
      wordRound: 0,
      meanRound: 0,
    });

    // wordTest, meanTest에 단어 리스트 저장
    for (let i = 0; i < wordList.length; i++) {
      await operateData(
        "PUSH",
        `Test/${testName}/wordList/wordTest/waiting`,
        wordList[i]
      );
    }
    const waitingWordList = await operateData(
      "GET",
      `Test/${testName}/wordList/wordTest/waiting`
    );
    await operateData(
      "SET",
      `Test/${testName}/wordList/meanTest/waiting`,
      waitingWordList
    );

    // DB 저장 완료 후, 로딩 Off하고 화면 이동
    setIsLoading(false);
    navigate(`/SetTest?title=${testName}`); // <- SetTest 화면으로 이동해야 됨. 일단 Main으로.
  }, [testName, selectedVocaPaths]);

  return (
    <>
      {isLoading ? (
        <Loading onMarginTop={false} />
      ) : (
        <>
          <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
            <SubHeader
              title="테스트 만들기"
              disabled={
                !testName || selectedVocaPaths.length === 0 ? true : false
              }
              btnName="만들기"
              handleClickBtn={onClickCreateBtn}
            />
            <Box mt={1} p={1}>
              <TextField
                label="테스트 이름"
                variant="outlined"
                autoComplete="off"
                onChange={(event) => setTestName(event.target.value)}
                sx={{ width: "100%" }}
              />
            </Box>
            <Divider sx={{ mt: 2, mb: 2 }} />
            {vocaTree === "Waiting" ? (
              <Loading />
            ) : (
              <>
                <Box sx={{ pl: 2, mb: 2 }}>
                  <Typography variant="subtitle1">
                    <strong>단어장 선택</strong>
                  </Typography>
                  <StyledUl>
                    <li>테스트 생성 시점 기준 단어 세트로 생성됩니다.</li>
                    <li>이후 단어 세트가 업데이트 되어도 반영되지 않습니다.</li>
                  </StyledUl>
                </Box>
                <Divider sx={{ mt: 2, mb: 2 }} />
                {vocaTree === "NoFile" ? (
                  <NoFile text="단어장이 비어있습니다." />
                ) : (
                  <ScrollList maxHeight="48vh">
                    {dirList &&
                      dirList.map((value, key) => (
                        <SetCheckbox
                          key={key}
                          index={0}
                          isDir
                          name={value}
                          path={`Voca/root`}
                          currentTree={vocaTree[value]}
                        />
                      ))}
                    {vocaList &&
                      vocaList.map((value, key) => (
                        <SetCheckbox
                          key={key}
                          index={0}
                          name={value}
                          path={`Voca/root`}
                        />
                      ))}
                  </ScrollList>
                )}
              </>
            )}
          </Box>
        </>
      )}
    </>
  );
};

export default Transition(() => (
  <VocaPathProvider>
    <CreateTest />
  </VocaPathProvider>
));

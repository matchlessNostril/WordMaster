import React, { useState, useMemo, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  VocaPathContext,
  VocaPathProvider,
} from "../../contexts/VocaPathContext";
import { Box, TextField } from "@mui/material";
import {
  Transition,
  SubHeader,
  Loading,
  NoFile,
  Divider,
  ScrollList,
} from "../../components";
import { InputField, Description, Checkbox } from "./components";
import { getList } from "../../service/database/getList";
import operateData from "../../service/database/operateData";
import listObjToArr from "../../utils/listObjToArr";

const CreateTest = () => {
  const navigate = useNavigate();
  const [testName, setTestName] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // VocaPathContext에서 사용자의 Voca JSON Tree, 선택된 단어장 Path 배열 State 불러오기
  const { vocaTree, selectedVocaPaths } = useContext(VocaPathContext);

  // Memoized 루트 디렉토리 리스트, 단어장 리스트
  const dirList = useMemo(() => listObjToArr(vocaTree, "dirList"), [vocaTree]);
  const vocaList = useMemo(
    () => listObjToArr(vocaTree, "vocaList"),
    [vocaTree]
  );

  const handleClickCreateBtn = useCallback(
    async (testName, selectedVocaPaths) => {
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

      // key가 같아야 해서 for문에서 meanTest 단어 저장 하지 않음
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
      navigate(`/SetTest?title=${testName}`);
    },
    []
  );

  const handleInput = useCallback((value) => {
    setTestName(value);
  }, []);

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
              handleClickBtn={() =>
                handleClickCreateBtn(testName, selectedVocaPaths)
              }
            />
            <InputField {...{ handleInput }} />
            <Divider margin={2} />
            {vocaTree === "Waiting" ? (
              <Loading />
            ) : (
              <>
                <Description />
                <Divider margin={2} />
                {vocaTree === "NoFile" ? (
                  <NoFile text="단어장이 비어있습니다." />
                ) : (
                  <ScrollList maxHeight="48vh">
                    {dirList &&
                      dirList.map((value, key) => (
                        <Checkbox
                          key={key}
                          index={0}
                          isDir
                          name={value}
                          path="Voca/root"
                          currentTree={vocaTree[value]}
                        />
                      ))}
                    {vocaList &&
                      vocaList.map((value, key) => (
                        <Checkbox
                          key={key}
                          index={0}
                          name={value}
                          path="Voca/root"
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

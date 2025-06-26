import React, { useState, useMemo, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  VocaPathContext,
  VocaPathProvider,
} from "../../contexts/VocaPathContext";
import { Box } from "@mui/material";
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
        alert(`名前に「 .  #  $  [  ] 」記号は入れられません。`);
        return;
      }

      // 버튼 클릭 시점의 testList 배열 값 불러오기
      const testList = await getList("Test/testList", "name");

      // 중복된 이름으로 생성 불가능
      if (testList.includes(testName)) {
        alert(`すでに存在する名前では作成できません。`);
        return;
      }

      // DB 저장 시작 시, 로딩 On
      setIsLoading(true);

      // TestList에 저장
      await operateData("PUSH", "Test/testList", { name: testName });

      // "Voca/root" 이후 문자열 저장 (이 부분은 그대로 순차 처리)
      for (let i = 0; i < selectedVocaPaths.length; i++) {
        await operateData(
          "PUSH",
          `Test/${testName}/paths`,
          selectedVocaPaths[i].slice(10)
        );
      }

      // 단어 리스트 병렬로 불러오기
      const wordListArr = await Promise.all(
        selectedVocaPaths.map((path) => getList(path))
      );
      let wordList = wordListArr.flat();

      // 기본 정보 저장
      await operateData("SET", `Test/${testName}/info`, {
        wordListLength: wordList.length,
        numOfPassedWord: 0,
        numOfPassedMean: 0,
        wordRound: 0,
        meanRound: 0,
      });

      // wordTest에 단어 리스트 저장
      const wordTestPromises = wordList.map((word) =>
        operateData("PUSH", `Test/${testName}/wordList/wordTest/waiting`, word)
      );
      await Promise.all(wordTestPromises);

      // key가 같아야 해서 wordTest를 불러와 meanTest에 저장
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
              title="テストを作成"
              disabled={
                !testName || selectedVocaPaths.length === 0 ? true : false
              }
              btnName="作成"
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
                  <NoFile text="単語帳が空です。" />
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

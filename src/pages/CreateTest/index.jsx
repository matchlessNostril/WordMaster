import React, { useState, useMemo, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  VocaPathContext,
  VocaPathProvider,
} from "../../contexts/VocaPathContext";
import { Card, useTheme } from "@mui/material";
import { alpha } from "@mui/material";
import {
  Transition,
  SubHeader,
  LargeLoading,
  NoFile,
  StyledTextField,
  ScrollList,
  ResponsiveBox,
} from "../../components";
import { Checkbox } from "./components";
import { getList } from "../../service/database/getList";
import operateData from "../../service/database/operateData";
import listObjToArr from "../../utils/listObjToArr";
import { toast } from "react-toastify";
import { updateTestListInVoca, saveWordInTest } from "../../utils/utils";

const CreateTest = () => {
  const theme = useTheme();

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
        toast.error(`名前に「 .  #  $  [  ] 」記号は入れられません。`);
        return;
      }

      // 버튼 클릭 시점의 testList 배열 값 불러오기
      const testList = await getList("Test/testList", "name");

      // 중복된 이름으로 생성 불가능
      if (testList.includes(testName)) {
        toast.error(`フォルダ内にすでに存在する名前では作成できません。`);
        return;
      }

      // DB 저장 시작 시, 로딩 On
      setIsLoading(true);

      // TestList에 저장 + 기본 정보 저장
      await operateData("PUSH", "Test/testList", { name: testName });
      await operateData("SET", `Test/${testName}/info`, {
        wordRound: 0,
        meanRound: 0,
      });

      // "Voca/root" 이후 문자열 저장 (이 부분은 그대로 순차 처리)
      await operateData(
        "SET",
        `Test/${testName}/paths`,
        selectedVocaPaths.map((path) => path.split("Voca/root/")[1])
      );

      // 테스트 생성 시 단어는 복제하지 않고, 주소로 접근
      await saveWordInTest(testName, selectedVocaPaths, "word");

      // wordTest 그대로 meanTest에 저장
      const waitingWordList = await operateData(
        "GET",
        `Test/${testName}/wordList/wordTest/waiting`
      );
      await operateData(
        "SET",
        `Test/${testName}/wordList/meanTest/waiting`,
        waitingWordList
      );

      // voca에서 testList 저장
      await updateTestListInVoca("ADD", selectedVocaPaths, testName);

      toast.success("新規テストの作成に成功しました。");

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
      {isLoading || vocaTree === "Waiting" ? (
        <LargeLoading />
      ) : (
        <>
          <ResponsiveBox>
            <div style={{ marginBottom: "20px" }}>
              <SubHeader
                title="新規テストを作成"
                disabled={
                  !testName || selectedVocaPaths.length === 0 ? true : false
                }
                btnName="作成"
                handleClickBtn={() =>
                  handleClickCreateBtn(testName, selectedVocaPaths)
                }
              />
            </div>
            <div style={{ padding: "0 15px" }}>
              <div style={{ marginBottom: "30px" }}>
                <StyledTextField
                  labelText="テスト名"
                  value={testName}
                  onChange={(event) => handleInput(event.target.value)}
                  placeholder="テスト名を入力してください。"
                />
              </div>
              {vocaTree === "NoFile" ? (
                <NoFile text="まだ作成された単語帳がありません。" />
              ) : (
                <Card
                  sx={{
                    display: "flex",
                    minHeight: "55vh",
                    flexDirection: "column",
                    backgroundColor: "transparent",
                    backgroundImage: `linear-gradient(to bottom right, ${
                      theme.palette.slate[800]
                    }, ${alpha(theme.palette.slate[800], 0.7)})`,
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    borderRadius: "12px",
                    border: `1px solid ${alpha(theme.palette.slate[700], 0.5)}`,
                    boxShadow:
                      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                    padding: "24px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      borderColor: alpha(theme.palette.cyan[500], 0.3),
                    },
                  }}
                >
                  <strong
                    style={{
                      fontSize: "1.25rem",
                      color: theme.palette.textColors.slate200,
                      marginBottom: "8px",
                    }}
                  >
                    単語帳を選択
                  </strong>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: theme.palette.textColors.slate400,
                    }}
                  >
                    フォルダをタップすると、フォルダが開きます。
                  </span>

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
                </Card>
              )}
            </div>
          </ResponsiveBox>
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

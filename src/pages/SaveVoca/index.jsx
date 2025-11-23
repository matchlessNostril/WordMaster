import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useWordListReducer from "./useWordListReducer";
import {
  Transition,
  SubHeader,
  Loading,
  ScrollList,
  ResponsiveBox,
} from "../../components";
import { InputField, WordCard, AddBtn } from "./components";
import { getList } from "../../service/database/getList";
import operateData from "../../service/database/operateData";
import { toast } from "react-toastify";
import { removeWordInTest, addWordInTest } from "../../utils/utils";

let originalWordList = [];

const SaveVoca = () => {
  const location = useLocation();
  const { mode, path } = location.state;
  const title = location.state?.title || "";
  const key = location.state?.key;

  const navigate = useNavigate();
  const [vocaName, setVocaName] = useState(title);
  const { wordList, wordListDispatch } = useWordListReducer();
  const [isLoading, setIsLoading] = useState(false);

  // Modify(수정) 모드인 경우, 마운트 시 데이터 불러오기
  useEffect(() => {
    if (mode !== "Modify") return;

    setIsLoading(true);
    // useEffect에서 콜백 함수에 async, await를 사용하는 것은 불가능하지만, then은 가능
    operateData("GET", `Voca/${path}/${title}`).then((_originalWordList) => {
      originalWordList = Object.entries(_originalWordList)
        .filter(([addressKey, value]) => addressKey !== "testList")
        .map(([addressKey, value]) => ({ ...value, addressKey }));
      wordListDispatch({ type: "FETCH_LIST", wordList: originalWordList });
      setIsLoading(false);
    });

    return () => {
      originalWordList = [];
    };
  }, []);

  const handleClickSaveBtn = useCallback(async (vocaName, wordList) => {
    // 제대로 입력되지 않은 단어가 있는지 먼저 확인
    let isValid = true;
    for (let i = 0; i < wordList.length; i++) {
      for (const propName in wordList[i]) {
        if (!wordList[i][propName]) {
          toast.error(`${i + 1}番目の単語に、未入力の項目があります。`);
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
        toast.error(`名前に「 .  #  $  [  ] 」記号は入れられません。`);
        return;
      }

      // 버튼 클릭 시점의 현재 path의 dirList와 vocaList 배열 값 불러오기
      const dirList = await getList(`Voca/${path}/dirList`, "name");
      const vocaList = await getList(`Voca/${path}/vocaList`, "name");
      const entireList = dirList.concat(vocaList);

      // 현재 디렉토리 내에서 중복된 이름으로 생성 불가능
      if (entireList.includes(vocaName)) {
        toast.error(
          `現在のフォルダ内に、すでに存在する名前では ${
            mode === "Modify" ? "変更" : "作成"
          }できません。`
        );
        return;
      }
    }

    // 단어 저장
    let promises = [];
    let addedWordAddressList = [];

    for (let i = 0; i < wordList.length; i++) {
      const word = wordList[i];
      if (word.hasOwnProperty("addressKey")) {
        // (1) 기존 단어 수정
        const { addressKey, ...rest } = word;
        promises.push(
          operateData("SET", `Voca/${path}/${vocaName}/${addressKey}`, rest)
        );
      } else {
        // (2) 새 단어 추가 (add모드는 여기만 해당)
        const addedWord = await operateData(
          "PUSH",
          `Voca/${path}/${vocaName}`,
          word
        );

        if (mode === "Modify") {
          const {
            _path: { pieces_ },
          } = addedWord;
          const addedWordAddress = pieces_[pieces_.length - 1];
          addedWordAddressList.push(addedWordAddress);
        }
      }
      // (3) 기존 단어 삭제 (voca에서 + test에서)
      const removedWordAddressList = originalWordList
        .filter(
          ({ addressKey }) =>
            !wordList.some(
              (word) =>
                word?.hasOwnProperty("addressKey") &&
                word.addressKey === addressKey
            )
        )
        .map(({ addressKey }) => addressKey);

      removedWordAddressList.forEach((addressKey) => {
        promises.push(
          operateData("REMOVE", `Voca/${path}/${vocaName}/${addressKey}`)
        );
      });

      if (removedWordAddressList.length > 0)
        promises.push(
          removeWordInTest(
            `Voca/${path}/${vocaName}`,
            removedWordAddressList,
            "multiple"
          )
        );
    }
    await Promise.all(promises);

    if (addedWordAddressList.length > 0) {
      await addWordInTest(`Voca/${path}/${vocaName}`, addedWordAddressList);
    }

    if (mode === "Modify") {
      // 기존 단어장 이름 수정, key 바뀌지 않게
      operateData("SET", `Voca/${path}/vocaList/${key}`, { name: vocaName });
    } else {
      // Create(생성) 모드인 경우 vocaList에도 저장하고 화면 이동
      operateData("PUSH", `Voca/${path}/vocaList`, { name: vocaName });
    }

    toast.success(
      mode === "Modify"
        ? "単語帳の編集に成功しました。"
        : "新規単語帳の作成に成功しました。"
    );

    // Modify(수정) 모드에서는 Voca 화면으로 이동 하기 때문에, 바뀐 State로 전달해야 함
    if (mode === "Modify") {
      navigate("/Voca", {
        state: {
          key,
          title: vocaName,
          path,
          isAfterModify: true,
        },
      });
    } else {
      navigate(-1);
    }
  }, []);

  const handleClickAddBtn = useCallback(() => {
    wordListDispatch({ type: "ADD" });
  }, []);

  return (
    <ResponsiveBox>
      <SubHeader
        title={mode === "Modify" ? "単語帳を編集" : "新規単語帳を作成"}
        disabled={vocaName ? false : true}
        btnName={mode === "Modify" ? "編集" : "作成"}
        handleClickBtn={() => handleClickSaveBtn(vocaName, wordList)}
      />
      <ScrollList maxHeight="75vh">
        <InputField {...{ vocaName, setVocaName }} />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {wordList.map((word, index) => (
              <WordCard
                key={index}
                {...{ index, word, wordListDispatch }}
                autoFocus={index === wordList.length - 1}
              />
            ))}
            <AddBtn handleClick={handleClickAddBtn} />
          </>
        )}
      </ScrollList>
    </ResponsiveBox>
  );
};

export default Transition(SaveVoca);

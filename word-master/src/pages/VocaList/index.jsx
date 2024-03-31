import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import { usePathListReducer, useModal } from "../../hooks";
import { Box } from "@mui/material";
import {
  Transition,
  ActionModal,
  Loading,
  NoFile,
  ScrollList,
} from "../../components";
import { Header, ListItemCard } from "./components";
import {
  autoFetchList,
  offAllDBEventListener,
} from "../../service/database/autoFetchList";
import operateData from "../../service/database/operateData";
import { isEmpty } from "lodash";

const VocaList = () => {
  // url 쿼리스트링에서 path 값 가져오기
  const [searchParams, _] = useSearchParams();
  const path = searchParams.get("path");

  const [currentDirName, setCurrentDirName] = useState("");

  // 하위 디렉토리/단어장 리스트 State와 Dispatch
  const { pathList: dirList, pathListDispatch: dirListDispatch } =
    usePathListReducer();
  const { pathList: vocaList, pathListDispatch: vocaListDispatch } =
    usePathListReducer();

  const [isLoading, setIsLoading] = useState(false);

  // 현재 path 디렉토리 트리 불러오기 + 리스트 데이터 이벤트 리스너 등록
  // 하위 디렉토리로 이동할 때마다 ListItem 컴포넌트 내에서 useNavigate로 경로 이동을 할 테지만
  // Route는 그대로이고, URL 파라미터 값만 바뀜.
  // 이러한 경우에는 다시 컴포넌트가 마운트 되지 않음!!
  // 따라서 path 값이 바뀔 때마다 currentDirName 값을 바꾸고
  // autoFetchList 함수를 실행하도록 의존성 배열에 path 추가
  useEffect(() => {
    if (path !== "root") {
      // currentDirName 값 변경
      const splitPathArr = path.split("/");
      setCurrentDirName(splitPathArr[splitPathArr.length - 1]);
    }

    // dirList, vocaList 불러오기
    autoFetchList(`Voca/${path}/dirList`, dirListDispatch, setIsLoading);
    autoFetchList(`Voca/${path}/vocaList`, vocaListDispatch, setIsLoading);

    // 종속성 배열(deps)에 값이 있을 때 반환 함수는,
    // 종속성 배열 값이 변경되어 useEffect 콜백 함수가 새로 실행되기 전에 실행되는 clean-up 함수
    // 여기서는 path 값이 바뀔 때마다 콜백 함수 실행 전에, 참조 되어있던 DB path에 등록한 이벤트 리스너를 제거
    return () => {
      offAllDBEventListener(`Voca/${path}/dirList`);
      offAllDBEventListener(`Voca/${path}/vocaList`);
    };
  }, [path]);

  const [openModal, setOpenModal, modalContent, handleClickOpenModal] =
    useModal();

  // 폴더 생성 전, 이름 중복 확인
  const handleClickCreateDir = useCallback(
    (inputValue) => {
      // 포함될 수 없는 문자가 있는 지 확인
      if (/[.#$\[\]]/.test(inputValue)) {
        alert(`이름에 「 .  #  $  [  ] 」 기호는 들어갈 수 없습니다.`);
        return;
      }

      const entireList = [];
      for (const key in dirList) {
        entireList.push(dirList[key]);
      }
      for (const key in vocaList) {
        entireList.push(vocaList[key]);
      }

      // 현재 디렉토리 내에서 중복된 이름으로 생성 불가능
      if (entireList.includes(inputValue)) {
        alert(`현재 폴더 내에 이미 존재하는 이름으로는 생성할 수 없습니다.`);
        return;
      }

      operateData("PUSH", `Voca/${path}/dirList`, { name: inputValue });
      setOpenModal(false);
    },
    [dirList, vocaList, path]
  );

  return (
    <>
      <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
        <Header
          {...{
            path,
            currentDirName,
            handleClickCreateDir,
            handleClickOpenModal,
          }}
        />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {isEmpty(dirList) && isEmpty(vocaList) ? (
              <NoFile text="비어있는 폴더입니다." />
            ) : (
              <ScrollList maxHeight="73vh">
                {Object.entries(dirList).map(([key, value]) => (
                  <ListItemCard
                    key={key}
                    itemKey={key}
                    title={value}
                    path={path}
                    isDir
                  />
                ))}
                {Object.entries(vocaList).map(([key, value]) => (
                  <ListItemCard
                    key={key}
                    itemKey={key}
                    title={value}
                    path={path}
                  />
                ))}
              </ScrollList>
            )}
          </>
        )}
      </Box>
      <ActionModal
        open={openModal}
        setOpen={setOpenModal}
        content={modalContent}
      />
    </>
  );
};

export default Transition(VocaList);

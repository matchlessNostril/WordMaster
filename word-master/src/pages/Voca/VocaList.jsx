// Router
import { useSearchParams, useNavigate } from "react-router-dom";
// Context
import { AuthContext } from "../../contexts/AuthContext";
// Hook
import { useContext, useState, useEffect, useCallback } from "react";
// Custom Hook
import useSaveListReducer from "../../hooks/useSaveListReducer";
import useLoading from "../../hooks/useLoading";
import usePopOver from "../../hooks/usePopOver";
import useModal from "../../hooks/useModal";
// MUI
import { Box, Stack, Typography, IconButton } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Component
import Transition from "../../components/Transition";
import BtnPopover from "../../components/BtnPopover";
import ActionModal from "../../components/ActionModal";
import Loading from "../../components/Loading";
import NoFile from "../../components/NoFile";
import VocaListItemCard from "../../components/Voca/VocaList/VocaListItemCard";
// Layout
import RowSpaceBetween from "../../layout/RowSpaceBetween";
import ScrollList from "../../layout/ScrollList";
// API
import {
  autoFetchList,
  offAllDBEventListener,
} from "../../service/database/autoFetchList";
import { pushData } from "../../service/database/dataOperation";
// Utils
import { isEmpty } from "lodash";

const VocaList = () => {
  // 사용자 정보
  const { displayName } = useContext(AuthContext);

  // url 쿼리스트링에서 path 값 가져오기
  const [searchParams, _] = useSearchParams();
  const path = searchParams.get("path");

  // 현재 디렉토리 이름 State
  const [currentDirName, setCurrentDirName] = useState("");

  // 현재 path의 하위 디렉토리 리스트 State와 Dispatch
  const { list: dirList, listDispatch: dirListDispatch } = useSaveListReducer();
  // 현재 path의 하위 단어장 리스트 State와 Dispatch
  const { list: vocaList, listDispatch: vocaListDispatch } =
    useSaveListReducer();

  // 로딩 State와 Setter
  const [onLoading, setOnLoading] = useLoading();

  // 현재 path 디렉토리 트리 불러오기 + 리스트 데이터 이벤트 리스너 등록
  // 하위 디렉토리로 이동할 때마다 VocaListItem 컴포넌트 내에서 useNavigate로 경로 이동을 할 테지만
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

    // 리스트를 불러오기 전까지 로딩 On
    setOnLoading(true);

    // dirList, vocaList 불러오기
    autoFetchList(`Voca/${path}/dirList`, dirListDispatch, setOnLoading);
    autoFetchList(`Voca/${path}/vocaList`, vocaListDispatch, setOnLoading);

    // 종속성 배열(deps)에 값이 있을 때 반환 함수는,
    // 종속성 배열 값이 변경되어 useEffect 콜백 함수가 새로 실행되기 전에 실행되는 clean-up 함수
    // 여기서는 path 값이 바뀔 때마다 콜백 함수 실행 전에, 참조 되어있던 DB path에 등록한 이벤트 리스너를 제거
    return () => {
      offAllDBEventListener(`Voca/${path}/dirList`);
      offAllDBEventListener(`Voca/${path}/vocaList`);
    };
  }, [path]);

  // navigate
  const navigate = useNavigate();

  // PopOver, Modal 연결되어 있음
  // (+) 버튼 PopOver
  const [popoverAnchor, setPopoverAnchor, onClickPopoverBtn] = usePopOver();
  const popoverBtns = [
    {
      name: "폴더 생성",
      onClickHandler: () => {
        setPopoverAnchor(null);
        onClickOpenModal(modalContents);
      },
    },
    {
      name: "단어 세트 생성",
      onClickHandler: () => {
        setPopoverAnchor(null);
        navigate("/SaveVoca", {
          state: {
            mode: "Create",
            path: path,
          },
        });
      },
    },
  ];

  // Modal
  const [openModal, setOpenModal, modalContent, onClickOpenModal] = useModal();

  // 폴더 생성 전, 이름 중복 확인할 함수
  const onClickCreateDir = useCallback(
    (inputValue) => {
      // 포함될 수 없는 문자가 있는 지 확인
      if (/[.#$\[\]]/.test(inputValue)) {
        alert(`이름에 '.', '#', '$', '[', ']' 기호는 들어갈 수 없습니다.`);
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

      pushData(`Voca/${path}/dirList`, { name: inputValue });
      setOpenModal(false);
    },
    [dirList, vocaList, path]
  );

  // 내용
  const modalContents = {
    title: "새로운 폴더 만들기",
    textField: {
      label: "폴더 이름",
    },
    btnName: "만들기",
    btnClickHandler: onClickCreateDir,
  };

  return (
    <>
      <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
        <RowSpaceBetween>
          {path !== "root" ? (
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => navigate(-1)}>
                <NavigateBeforeIcon
                  sx={{
                    fontSize: "40px",
                    "& > button": { padding: 0, paddingRight: "2px" },
                  }}
                />
              </IconButton>
              <Typography variant="h5">{currentDirName}</Typography>
            </Stack>
          ) : (
            <Typography variant="h5" ml={2}>
              <strong>{displayName}</strong>님의 단어장
            </Typography>
          )}
          <IconButton onClick={onClickPopoverBtn}>
            <AddCircleIcon sx={{ fontSize: "40px" }} />
          </IconButton>
          <BtnPopover
            anchor={popoverAnchor}
            setAnchor={setPopoverAnchor}
            buttons={popoverBtns}
          />
        </RowSpaceBetween>
        {onLoading ? (
          <Loading />
        ) : (
          <>
            {isEmpty(dirList) && isEmpty(vocaList) ? (
              <NoFile />
            ) : (
              <ScrollList>
                {Object.entries(dirList).map(([key, value]) => (
                  <VocaListItemCard
                    key={key}
                    itemKey={key}
                    title={value}
                    path={path}
                    isDir
                  />
                ))}
                {Object.entries(vocaList).map(([key, value]) => (
                  <VocaListItemCard
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

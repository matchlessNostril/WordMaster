import React from "react";
// Router
import { useNavigate } from "react-router-dom";
// Custom Hook
import usePopOver from "../../../hooks/usePopOver";
import useModal from "../../../hooks/useModal";
// MUI
import {
  ListItem,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
// Component
import BtnPopover from "../../BtnPopover";
import ActionModal from "../../ActionModal";
// API
import { getList } from "../../../service/database/getList";
import {
  getData,
  setData,
  updateData,
  removeData,
} from "../../../service/database/dataOperation";
// Utils
import { isEmpty } from "lodash";

const VocaListItemCard = ({ itemKey, title, path, isDir = false }) => {
  // navigate
  const navigate = useNavigate();

  // 이 컴포넌트는 React.memo로 감싸고 있으며
  // 이름 변경으로 인해 title이 바뀌는 경우 외에는 props 값이 잘 바뀌지 않기 때문에 useCallback 사용 X
  const moveToNextPath = () => {
    if (isDir) {
      navigate(`/VocaList?path=${path + "/" + title}`);
    } else {
      navigate("/Voca", {
        state: {
          key: itemKey,
          title: title,
          path: path,
        },
      });
    }
  };

  // (펼치기) 버튼 PopOver
  const [popoverAnchor, setPopoverAnchor, onClickPopoverBtn] = usePopOver();
  const popoverBtns = [
    {
      name: "이름 바꾸기",
      onClickHandler: () => {
        setPopoverAnchor(null);
        onClickOpenModal(modalContents[0]);
      },
    },
    {
      name: "삭제",
      onClickHandler: () => {
        setPopoverAnchor(null);
        onClickOpenModal(modalContents[1]);
      },
    },
  ];

  // Modal
  const [openModal, setOpenModal, modalContent, onClickOpenModal] = useModal();

  // 버튼 클릭 핸들러 함수
  // 1. 이름 바꾸기
  const onClickChangeBtn = async (inputValue) => {
    // 기존 이름일 경우 early return
    if (inputValue === title) {
      setOpenModal(false);
      return;
    }

    // 포함될 수 없는 문자가 있는 지 확인
    if (/[.#$\[\]]/.test(inputValue)) {
      alert(`이름에 '.', '#', '$', '[', ']' 기호는 들어갈 수 없습니다.`);
      return;
    }

    // 버튼 클릭 시점의 현재 path의 dirList와 vocaList 배열 값 불러오기
    const dirList = await getList(`Voca/${path}/dirList`, "name");
    const vocaList = await getList(`Voca/${path}/vocaList`, "name");
    const entireList = dirList.concat(vocaList);

    // 현재 디렉토리 내에서 중복된 이름으로 생성 불가능
    if (entireList.includes(inputValue)) {
      alert(`현재 폴더 내에 이미 존재하는 이름으로는 변경할 수 없습니다.`);
      return;
    }

    // 변경 가능한 이름이라면
    // 먼저 기존 데이터 일시 저장
    const tempData = await getData(`Voca/${path}/${title}`);

    // 빈 데이터가 아니라면, 데이터 이전하고 기존 경로 삭제
    if (!isEmpty(tempData)) {
      setData(`Voca/${path}/${inputValue}`, tempData);
      removeData(`Voca/${path}/${title}`);
    }

    // 리스트에서도 변경된 이름으로 업데이트
    updateData(
      isDir
        ? `Voca/${path}/dirList/${itemKey}`
        : `Voca/${path}/vocaList/${itemKey}`,
      { name: inputValue }
    );

    setOpenModal(false);
  };

  // 2. 삭제
  const onClickRemoveBtn = () => {
    removeData(`Voca/${path}/${title}`);
    removeData(
      isDir
        ? `Voca/${path}/dirList/${itemKey}`
        : `Voca/${path}/vocaList/${itemKey}`
    );
    setOpenModal(false);
  };

  // 내용
  const modalContents = [
    // inex 0 : 이름 바꾸기 클릭
    {
      title: "이름 바꾸기",
      textField: {
        label: "변경할 이름",
      },
      btnName: "확인",
      btnClickHandler: onClickChangeBtn,
    },
    // index 1 : 삭제 클릭
    {
      title: "정말 삭제하시겠습니까?",
      btnName: "삭제",
      btnClickHandler: onClickRemoveBtn,
    },
  ];

  return (
    <>
      <ListItem
        key={itemKey}
        sx={{
          justifyContent: "center",
          paddingLeft: 0,
          paddingRight: 0,
        }}
      >
        <Card variant="outlined" sx={{ display: "flex", width: "83vw" }}>
          <CardActionArea onClick={moveToNextPath}>
            <CardContent sx={{ display: "flex" }}>
              <img
                src={
                  isDir
                    ? require("../../../assets/icons/folder_closed.png")
                    : require("../../../assets/icons/document.png")
                }
                style={{
                  width: "25px",
                  height: "25px",
                  marginRight: "15px",
                }}
              />
              <Typography variant="body1" sx={{ flexGrow: 1 }}>
                {title}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <IconButton onClick={onClickPopoverBtn}>
              <KeyboardArrowDownIcon />
            </IconButton>
            <BtnPopover
              anchor={popoverAnchor}
              setAnchor={setPopoverAnchor}
              buttons={popoverBtns}
            />
          </CardActions>
        </Card>
      </ListItem>
      <ActionModal
        open={openModal}
        setOpen={setOpenModal}
        content={modalContent}
      />
    </>
  );
};

export default React.memo(VocaListItemCard);

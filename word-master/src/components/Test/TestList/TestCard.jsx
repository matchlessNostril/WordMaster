import { useNavigate } from "react-router-dom";
import React from "react";
import { usePopOver, useModal } from "../../../hooks";
import {
  ListItem,
  Card,
  CardActionArea,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from "@mui/material";
import { BtnPopover, ActionModal } from "../../../components";
import { getList } from "../../../service/database/getList";
import operateData from "../../../service/database/operateData";
import { isEmpty } from "lodash";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const TestCard = ({ itemKey, title }) => {
  // navigate
  const navigate = useNavigate();

  // (펼치기) 버튼 PopOver
  const [popoverAnchor, setPopoverAnchor, handleClickPopoverBtn] = usePopOver();
  const popoverBtns = [
    {
      name: "이름 바꾸기",
      handleClick: () => {
        setPopoverAnchor(null);
        handleClickOpenModal(modalContents[0]);
      },
    },
    {
      name: "삭제",
      handleClick: () => {
        setPopoverAnchor(null);
        handleClickOpenModal(modalContents[1]);
      },
    },
  ];

  // Modal
  const [openModal, setOpenModal, modalContent, handleClickOpenModal] =
    useModal();

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
      alert(`이름에 「 .  #  $  [  ] 」 기호는 들어갈 수 없습니다.`);
      return;
    }

    // 버튼 클릭 시점의 testList 배열 값 불러오기
    const testList = await getList("Test/testList", "name");

    // 중복된 이름으로 생성 불가능
    if (testList.includes(inputValue)) {
      alert(`이미 존재하는 이름으로는 변경할 수 없습니다.`);
      return;
    }

    // 변경 가능한 이름이라면
    // 먼저 기존 데이터 일시 저장
    const tempData = await operateData("GET", `Test/${title}`);

    // 빈 데이터가 아니라면, 데이터 이전하고 기존 경로 삭제
    if (!isEmpty(tempData)) {
      operateData("SET", `Test/${inputValue}`, tempData);
      operateData("REMOVE", `Test/${title}`);
    }

    // 리스트에서도 변경된 이름으로 업데이트
    operateData("UPDATE", `Test/testList/${itemKey}`, { name: inputValue });

    setOpenModal(false);
  };

  // 2. 삭제
  const onClickRemoveBtn = () => {
    operateData("REMOVE", `Test/${title}`);
    operateData("REMOVE", `Test/testList/${itemKey}`);
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
      handleClickBtn: onClickChangeBtn,
    },
    // index 1 : 삭제 클릭
    {
      title: "정말 삭제하시겠습니까?",
      btnName: "삭제",
      handleClickBtn: onClickRemoveBtn,
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
          <CardActionArea onClick={() => navigate(`/SetTest?title=${title}`)}>
            <CardContent sx={{ display: "flex" }}>
              <img
                src={require("../../../assets/icons/test.png")}
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
            <IconButton onClick={handleClickPopoverBtn}>
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

export default React.memo(TestCard);

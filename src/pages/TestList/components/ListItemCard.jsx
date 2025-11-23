import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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
import { toast } from "react-toastify";
import { updateTestListInVoca } from "../../../utils/utils";

const ListItemCard = ({ itemKey, title }) => {
  const navigate = useNavigate();

  const [popoverAnchor, setPopoverAnchor, handleClickPopoverBtn] = usePopOver();
  const [openModal, setOpenModal, modalContent, handleClickOpenModal] =
    useModal();

  // 1. 이름 바꾸기
  const handleClickChangeBtn = useCallback(async (inputValue) => {
    // 기존 이름일 경우 early return
    if (inputValue === title) {
      setOpenModal(false);
      return;
    }

    // 포함될 수 없는 문자가 있는 지 확인
    if (/[.#$\[\]]/.test(inputValue)) {
      toast.error(`名前に「 .  #  $  [  ] 」記号は入れられません。`);
      return;
    }

    // 버튼 클릭 시점의 testList 배열 값 불러오기
    const testList = await getList("Test/testList", "name");

    // 중복된 이름으로 생성 불가능
    if (testList.includes(inputValue)) {
      toast.error(`すでに存在する名前では変更できません。`);
      return;
    }

    // 변경 가능한 이름이라면
    // 먼저 기존 데이터 일시 저장
    const tempData = await operateData("GET", `Test/${title}`);

    // testList에서도 변경된 이름으로 업데이트
    const _vocaPaths = await operateData("GET", `Test/${title}/paths`);
    const vocaPaths = Object.values(_vocaPaths).map(
      (path) => `Voca/root/${path}`
    );
    await updateTestListInVoca("UPDATE", vocaPaths, title, inputValue);

    // 데이터 이전하고 기존 경로 삭제
    if (!isEmpty(tempData)) {
      operateData("SET", `Test/${inputValue}`, tempData);
      operateData("REMOVE", `Test/${title}`);
    }

    // 리스트에서도 변경된 이름으로 업데이트
    operateData("UPDATE", `Test/testList/${itemKey}`, { name: inputValue });

    toast.success("名前の変更に成功しました。");
    setOpenModal(false);
  }, []);

  // 2. 삭제
  const handleClickRemoveBtn = useCallback(async () => {
    const _vocaPaths = await operateData("GET", `Test/${title}/paths`);
    const vocaPaths = Object.values(_vocaPaths).map(
      (path) => `Voca/root/${path}`
    );

    const promises = [
      operateData("REMOVE", `Test/${title}`),
      operateData("REMOVE", `Test/testList/${itemKey}`),
    ];
    await Promise.all(promises);

    await updateTestListInVoca("REMOVE", vocaPaths, title);

    toast.success("削除に成功しました。");
    setOpenModal(false);
  }, []);

  const modalContents = useMemo(
    () => [
      {
        title: "名前を変更",
        textField: {
          label: "新しい名前",
        },
        btnName: "変更",
        handleClickBtn: handleClickChangeBtn,
      },
      {
        title: "削除してもよろしいですか？",
        btnName: "削除",
        handleClickBtn: handleClickRemoveBtn,
      },
    ],
    []
  );

  const popoverBtns = useMemo(
    () => [
      {
        name: "名前を変更",
        handleClick: () => {
          setPopoverAnchor(null);
          handleClickOpenModal(modalContents[0]);
        },
      },
      {
        name: "削除",
        handleClick: () => {
          setPopoverAnchor(null);
          handleClickOpenModal(modalContents[1]);
        },
      },
    ],
    []
  );

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
                alt="テストアイコン"
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

export default React.memo(ListItemCard);

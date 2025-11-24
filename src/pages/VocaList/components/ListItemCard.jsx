import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { usePopOver, useModal } from "../../../hooks";
import {
  ListItem,
  Card,
  CardActionArea,
  CardActions,
  Typography,
  IconButton,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import { BtnPopover, ActionModal } from "../../../components";
import { getList } from "../../../service/database/getList";
import operateData from "../../../service/database/operateData";
import { isEmpty } from "lodash";
import { toast } from "react-toastify";
import { updateVocaNameInTest } from "../../../utils/utils";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import FolderSharpIcon from "@mui/icons-material/FolderSharp";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";

const ListItemCard = ({ itemKey, title, path, isDir = false }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [popoverAnchor, setPopoverAnchor, handleClickPopoverBtn] = usePopOver();
  const [openModal, setOpenModal, modalContent, handleClickOpenModal] =
    useModal();

  const moveToNextPath = useCallback(() => {
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
  }, []);

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

    // 버튼 클릭 시점의 현재 path의 dirList와 vocaList 배열 값 불러오기
    const dirList = await getList(`Voca/${path}/dirList`, "name");
    const vocaList = await getList(`Voca/${path}/vocaList`, "name");
    const entireList = dirList.concat(vocaList);

    // 현재 디렉토리 내에서 중복된 이름으로 생성 불가능
    if (entireList.includes(inputValue)) {
      toast.error(`現在のフォルダ内に、すでに存在する名前では変更できません。`);
      return;
    }

    // 변경 가능한 이름이라면
    // 먼저 기존 데이터 일시 저장
    const tempData = await operateData("GET", `Voca/${path}/${title}`);

    // 빈 데이터가 아니라면, 데이터 이전하고 기존 경로 삭제
    if (!isEmpty(tempData)) {
      await operateData("SET", `Voca/${path}/${inputValue}`, tempData);
      await operateData("REMOVE", `Voca/${path}/${title}`);
    }

    // 리스트에서도 변경된 이름으로 업데이트
    await operateData(
      "UPDATE",
      isDir
        ? `Voca/${path}/dirList/${itemKey}`
        : `Voca/${path}/vocaList/${itemKey}`,
      { name: inputValue }
    );

    // Test에서도 변경된 이름으로 업데이트
    await updateVocaNameInTest({
      type: "UPDATE",
      path: `Voca/${path}/${title}`,
      newPath: `Voca/${path}/${inputValue}`,
      isDir,
    });

    toast.success("名前の変更に成功しました。");
    setOpenModal(false);
  }, []);

  // 2. 삭제
  const handleClickRemoveBtn = useCallback(async () => {
    await operateData("REMOVE", `Voca/${path}/${title}`);
    await operateData(
      "REMOVE",
      isDir
        ? `Voca/${path}/dirList/${itemKey}`
        : `Voca/${path}/vocaList/${itemKey}`
    );

    await updateVocaNameInTest({
      type: "REMOVE",
      path: `Voca/${path}/${title}`,
      isDir,
    });

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
        icon: <DriveFileRenameOutlineSharpIcon sx={{ color: "white" }} />,
      },
      {
        name: "削除",
        handleClick: () => {
          setPopoverAnchor(null);
          handleClickOpenModal(modalContents[1]);
        },
        icon: (
          <DeleteSharpIcon sx={{ color: alpha(theme.palette.red[400], 0.7) }} />
        ),
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
          width: "100%",
        }}
      >
        <Card
          variant="outlined"
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            backgroundColor: alpha(theme.palette.slate[800], 0.5),
            borderRadius: "16px",
            border: `1px solid ${alpha(theme.palette.slate[700], 0.5)}`,
            boxShadow: "0 20px 35px -20px rgba(0,0,0,0.8)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
            transition: "border-color 0.2s ease, transform 0.2s ease",
            "&:hover": {
              borderColor: alpha(theme.palette.slate[600], 0.7),
              transform: "translateY(-1px)",
            },
          }}
        >
          <CardActionArea
            onClick={moveToNextPath}
            sx={{
              flexGrow: 1,
              display: "flex",
              alignItems: "center",
              gap: "16px",
              padding: "18px 24px",
            }}
          >
            <Box
              sx={{
                width: 44,
                height: 44,
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDir
                  ? alpha(theme.palette.amber[400], 0.2)
                  : alpha(theme.palette.slate[500], 0.2),
                color: isDir
                  ? theme.palette.amber[400]
                  : theme.palette.slate[400],
                flexShrink: 0,
              }}
            >
              {isDir ? (
                <FolderSharpIcon
                  sx={{
                    width: 24,
                    height: 24,
                    color: theme.palette.amber[250],
                  }}
                />
              ) : (
                <DescriptionSharpIcon
                  sx={{ width: 24, height: 24, color: theme.palette.blue[400] }}
                />
              )}
            </Box>
            <Typography
              variant="body1"
              sx={{
                flexGrow: 1,
                fontWeight: 500,
                color: theme.palette.textColors.slate200,
                fontSize: "1rem",
              }}
            >
              {title}
            </Typography>
          </CardActionArea>
          <CardActions
            sx={{
              paddingRight: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <IconButton
              onClick={handleClickPopoverBtn}
              sx={{
                padding: "8px",
                borderRadius: "10px",
                color: theme.palette.textColors.slate300,
                transition: "all 0.2s ease",
                "&:hover": {
                  color: theme.palette.textColors.slate100,
                  backgroundColor: alpha(theme.palette.slate[700], 0.4),
                },
              }}
            >
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

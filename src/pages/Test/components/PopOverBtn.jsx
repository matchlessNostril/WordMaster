import React from "react";
import { Button, useTheme, alpha } from "@mui/material";
import { BtnPopover, ActionModal } from "../../../components";
import { usePopOver, useModal } from "../../../hooks";
import { removeWordInDB } from "../../../utils/utils";
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditWordForm from "./EditWordForm";
import DriveFileRenameOutlineSharpIcon from "@mui/icons-material/DriveFileRenameOutlineSharp";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

const PopOverBtn = ({ question, questionDispatch, setCurrentListLength }) => {
  const theme = useTheme();
  const [openModal, setOpenModal, modalContent, handleClickOpenModal] =
    useModal();

  const removeWord = async () => {
    const result = await removeWordInDB(
      question.vocaPath,
      question.wordAddress
    );
    if (result === "fail:lastWord") {
      toast.error("該当の単語帳には単語が一つしかないため、削除できません。");
      setOpenModal(false);
      return;
    }

    // question state에서 삭제
    questionDispatch({ type: "DELETE_WORD", deletedQuestion: question });
    // currentListLength 업데이트
    setCurrentListLength((prev) => prev - 1);

    toast.success("単語の削除に成功しました。");
    setOpenModal(false);
  };

  const modalContents = [
    {
      title: "単語を編集",
      children: (
        <EditWordForm
          question={question}
          setOpenModal={setOpenModal}
          questionDispatch={questionDispatch}
        />
      ),
    },
    {
      title: "削除してもよろしいですか？",
      btnName: "削除",
      handleClickBtn: removeWord,
    },
  ];

  const [popoverAnchor, setPopoverAnchor, handleClickPopoverBtn] = usePopOver();
  const popoverBtns = [
    {
      name: "編集",
      handleClick: () => {
        setPopoverAnchor(null);
        handleClickOpenModal(modalContents[0]);
      },
      icon: <DriveFileRenameOutlineSharpIcon sx={{ color: "white" }} />,
    },
    {
      name: "削除",
      handleClick: async () => {
        setPopoverAnchor(null);
        handleClickOpenModal(modalContents[1]);
      },
      icon: (
        <DeleteSharpIcon sx={{ color: alpha(theme.palette.red[400], 0.7) }} />
      ),
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: 0,
          right: "16px",
          zIndex: 50,
          padding: "3px 8px",
          backgroundColor: alpha(theme.palette.slate[700], 0.8),
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: "8px",
          borderBottomRightRadius: "8px",
          minWidth: "auto",
          transition: "background-color 0.2s ease",
          "&:hover": {
            backgroundColor: theme.palette.slate[700],
          },
        }}
        onClick={handleClickPopoverBtn}
      >
        <KeyboardArrowDownIcon
          sx={{
            width: "16px",
            height: "16px",
            color: theme.palette.textColors.slate300,
          }}
        />
      </Button>
      <BtnPopover
        anchor={popoverAnchor}
        setAnchor={setPopoverAnchor}
        buttons={popoverBtns}
        orientation="horizontal"
      />
      <ActionModal
        open={openModal}
        setOpen={setOpenModal}
        content={modalContent}
      />
    </>
  );
};

export default PopOverBtn;

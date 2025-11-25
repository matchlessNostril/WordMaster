import React from "react";
import { Button } from "@mui/material";
import { BtnPopover, ActionModal } from "../../../components";
import { usePopOver, useModal } from "../../../hooks";
import { removeWordInDB } from "../../../utils/utils";
import { toast } from "react-toastify";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import EditWordForm from "./EditWordForm";

const PopOverBtn = ({ question, questionDispatch, setCurrentListLength }) => {
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
    },
    {
      name: "削除",
      handleClick: async () => {
        setPopoverAnchor(null);
        handleClickOpenModal(modalContents[1]);
      },
    },
  ];

  return (
    <>
      <Button
        variant="contained"
        sx={{
          position: "absolute",
          top: 0,
          right: 5,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          minWidth: 30,
          width: 30,
          height: 20,
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#f0f0f0",
            transform: "scale(0.975)",
            transition: "transform 0.1s ease-in-out",
          },
        }}
        onClick={handleClickPopoverBtn}
      >
        <KeyboardArrowDownIcon sx={{ fontSize: 16, color: "#535353" }} />
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


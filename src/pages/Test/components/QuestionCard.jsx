import React, { useState } from "react";
import { usePopOver, useModal } from "../../../hooks";
import { BtnPopover, ActionModal } from "../../../components";
import { WordCardForm } from "../../SaveVoca/components/WordCard/index";
import operateData from "../../../service/database/operateData";
import { removeWordInDB } from "../../../utils/utils";
import {
  useMediaQuery,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Typography,
  Fade,
  Button,
} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { toast } from "react-toastify";

const QuestionCard = ({
  type,
  showAnswer,
  setShowAnswer,
  question,
  questionDispatch,
  setCurrentListLength,
}) => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const questionWord = question.word;

  return (
    <Card
      sx={{
        flexGrow: 1,
        mt: 2,
        position: "relative",
        backgroundColor: showAnswer ? "#dbdbdb" : "#535353",
      }}
    >
      <CardActionArea
        onClick={() => setShowAnswer((prev) => !prev)}
        sx={{ height: isPortrait ? "45vh" : "40vh" }}
      >
        <CardContent
          sx={{
            p: 0,
            width: "100%",
            textAlign: showAnswer ? "left" : "center",
            height: "100%",
          }}
        >
          {questionWord && (
            <>
              {showAnswer ? (
                <AnswerTable type={type} questionWord={questionWord} />
              ) : (
                <Fade
                  in
                  timeout={1000}
                  key={`${questionWord.word}-${questionWord.mean}-${showAnswer}`}
                >
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <strong
                      style={{
                        color: "white",
                        fontSize: "26px",
                        fontWeight: "initial",
                        whiteSpace: "pre-line",
                        display: "inline-block",
                      }}
                    >
                      {type === "word" ? questionWord.word : questionWord.mean}
                    </strong>
                  </Box>
                </Fade>
              )}
            </>
          )}

          {!showAnswer && (
            <TouchAppIcon
              sx={{
                position: "absolute",
                bottom: 10,
                right: 10,
                color: "#3c3c3c",
              }}
            />
          )}
        </CardContent>
      </CardActionArea>
      <PopOverBtn
        question={question}
        questionDispatch={questionDispatch}
        setCurrentListLength={setCurrentListLength}
      />
    </Card>
  );
};

export default QuestionCard;

const AnswerTable = ({ type, questionWord }) => {
  const answerValue = type === "word" ? questionWord?.mean : questionWord?.word;

  const detailRows = [
    { key: "pronunciation", label: "発音", value: questionWord?.pronunciation },
    { key: "explain", label: "説明", value: questionWord?.explain },
    { key: "example", label: "例文", value: questionWord?.example },
  ].filter(
    ({ value }) => value !== undefined && value !== null && value !== ""
  );

  const totalDetailRatio =
    detailRows.length === 0 ? 0 : detailRows.length === 1 ? 0.5 : 0.6;
  const answerRatio =
    detailRows.length === 0 ? 1 : detailRows.length === 1 ? 0.5 : 0.4;

  const explainRow = detailRows.find(({ key }) => key === "explain");
  const otherDetailRows = detailRows.filter(({ key }) => key !== "explain");

  let explainRatio = 0;
  let otherRatioPer = 0;

  if (detailRows.length === 1) {
    if (explainRow) {
      explainRatio = totalDetailRatio;
    } else {
      otherRatioPer = totalDetailRatio;
    }
  } else if (detailRows.length > 1) {
    if (explainRow) {
      explainRatio = Math.min(totalDetailRatio / 2, totalDetailRatio);
      const remaining = totalDetailRatio - explainRatio;
      otherRatioPer = otherDetailRows.length
        ? remaining / otherDetailRows.length
        : 0;
    } else {
      otherRatioPer = totalDetailRatio / detailRows.length;
    }
  }

  const tableRows = [
    { key: "answer", label: "答え", value: answerValue, ratio: answerRatio },
    ...detailRows.map((row) => ({
      ...row,
      ratio:
        row.key === "explain"
          ? explainRatio || totalDetailRatio
          : otherRatioPer || totalDetailRatio,
    })),
  ];

  const tableBorderColor = "rgba(0, 0, 0, 0.12)";

  const getValueTypographySx = (value, isAnswer) => {
    const length = value ? value.toString().length : 0;
    let fontSize = isAnswer ? 18 : 14;

    if (length > 200) {
      fontSize = isAnswer ? 15 : 11;
    } else if (length > 120) {
      fontSize = isAnswer ? 16 : 12;
    }

    return {
      color: "#535353",
      whiteSpace: "pre-wrap",
      fontSize,
      lineHeight: 1.4,
      width: "100%",
    };
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "grid",
        gridTemplateColumns: "max-content 1fr",
        gridTemplateRows: tableRows
          .map((row) => `${((row.ratio || 0) * 100).toFixed(2)}%`)
          .join(" "),
        alignItems: "stretch",
        textAlign: "left",
      }}
    >
      {tableRows.map(({ key, label, value }, index) => (
        <React.Fragment key={`${key}-${label}`}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              px: 2,
              py: 1,
              borderTop: index === 0 ? "none" : `1px solid ${tableBorderColor}`,
              borderRight: `1px solid ${tableBorderColor}`,
            }}
          >
            <Typography
              variant="body2"
              sx={{ color: "#535353", fontWeight: 600 }}
            >
              {label}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              px: 0,
              py: 1,
              borderTop: index === 0 ? "none" : `1px solid ${tableBorderColor}`,
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "100%",
                overflowY: "auto",
                px: 1,
                display: "flex",
                alignItems: "center",
                scrollbarWidth: "thin",
                scrollbarColor: "#bdbdbd transparent",
                "&::-webkit-scrollbar": {
                  width: "6px",
                },
                "&::-webkit-scrollbar-track": {
                  backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#bdbdbd",
                  borderRadius: "3px",
                },
              }}
            >
              <Typography sx={getValueTypographySx(value, key === "answer")}>
                {value || "-"}
              </Typography>
            </Box>
          </Box>
        </React.Fragment>
      ))}
    </Box>
  );
};

const EditWordForm = ({ question, setOpenModal, questionDispatch }) => {
  const { wordAddress, word, vocaPath } = question;

  const [newWord, setNewWord] = useState(word);
  const [checkList, setCheckList] = useState({
    pronunciation: newWord.hasOwnProperty("pronunciation") ? true : false,
    explain: newWord.hasOwnProperty("explain") ? true : false,
    example: newWord.hasOwnProperty("example") ? true : false,
  });

  const handleInput = (event, propName) => {
    setNewWord((prev) => ({
      ...prev,
      [propName]: event.target.value,
    }));
  };

  const handleCheck = (propName) => {
    const isChecked = newWord.hasOwnProperty(propName);

    if (isChecked) {
      const { [propName]: _, ...rest } = newWord;
      setNewWord(rest);
    } else {
      setNewWord((prev) => ({
        ...prev,
        [propName]: "",
      }));
    }

    setCheckList((prev) => ({
      ...prev,
      [propName]: !prev[propName],
    }));
  };

  const handleSave = async () => {
    // validation
    if (
      !newWord.word ||
      !newWord.mean ||
      (checkList.pronunciation && !newWord.pronunciation) ||
      (checkList.explain && !newWord.explain) ||
      (checkList.example && !newWord.example)
    ) {
      toast.error("未入力項目があります。");
      return;
    }

    // save
    await operateData("SET", `${vocaPath}/${wordAddress}`, newWord);
    questionDispatch({ type: "SET_NEW_WORD", newWord });
    setOpenModal(false);
    toast.success("単語の編集に成功しました。");
  };

  return (
    <div style={{ width: "75vw" }}>
      <WordCardForm
        {...{ word: newWord, checkList, handleInput, handleCheck }}
      />
      <div
        style={{ display: "flex", justifyContent: "flex-end", marginTop: 30 }}
      >
        <Button variant="contained" onClick={handleSave}>
          保存
        </Button>
      </div>
    </div>
  );
};

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

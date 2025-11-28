import React, { useState } from "react";
import { WordCardForm } from "../../SaveVoca/components/WordCard/index";
import operateData from "../../../service/database/operateData";
import { toast } from "react-toastify";
import { GradientButton, ChipButton } from "../../../components";
import { useTheme, alpha } from "@mui/material";

const EditWordForm = ({ question, setOpenModal, questionDispatch }) => {
  const theme = useTheme();
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
    <div>
      <WordCardForm
        {...{
          word: newWord,
          checkList,
          handleInput,
          handleCheck,
          minWidth: "70vw",
        }}
      />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
        }}
      >
        {[
          {
            propName: "pronunciation",
            text: "発音",
          },
          {
            propName: "explain",
            text: "説明",
          },
          {
            propName: "example",
            text: "例文",
          },
        ].map(({ propName, text }, index) => (
          <ChipButton
            key={propName + index}
            text={text}
            selected={checkList[propName]}
            onClick={() => handleCheck(propName)}
          />
        ))}
      </div>
      <div
        style={{
          marginTop: 25,
          marginLeft: "-10%",
          width: "120%",
          height: 1,
          backgroundColor: alpha(theme.palette.slate[700], 0.5),
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 25,
        }}
      >
        <GradientButton text="保存" onClick={handleSave} />
      </div>
    </div>
  );
};

export default EditWordForm;

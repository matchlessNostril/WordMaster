import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FormControl, Box } from "@mui/material";
import {
  Transition,
  SubHeader,
  LargeLoading,
  ScrollList,
  ResponsiveBox,
  ChipButton,
} from "../../components";
import WordCard from "./components/WordCard";
import CustomRadioButton from "./components/CustomRadioButton";
import { getList } from "../../service/database/getList";

const Voca = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { key, title, path } = location.state;

  const [isLoading, setIsLoading] = useState(false);
  const [radio, setRadio] = useState("word");
  const [isChecked, setIsChecked] = useState(false);
  const [wordList, setWordList] = useState([{}]);

  useEffect(() => {
    setIsLoading(true);
    getList(`Voca/${path}/${title}`).then((_list) => {
      const list = _list.filter((value) => value.hasOwnProperty("word"));
      setWordList(list);
      setIsLoading(false);
    });
  }, []);

  const handleClickModifyBtn = useCallback(() => {
    navigate("/SaveVoca", {
      state: {
        mode: "Modify",
        path,
        key,
        title,
      },
    });
  }, []);

  return (
    <>
      {isLoading ? (
        <LargeLoading />
      ) : (
        <ResponsiveBox>
          <SubHeader
            title={title}
            disabled={false}
            btnName="編集"
            handleClickBtn={handleClickModifyBtn}
          />
          <FormControl sx={{ width: "100%", my: 2 }}>
            <div
              style={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                gap: 30,
              }}
            >
              <Box
                sx={{ display: "flex", alignItems: "center", gap: 3, ml: 2 }}
              >
                <CustomRadioButton
                  value="word"
                  selected={radio === "word"}
                  label="単語"
                  onClick={() => setRadio("word")}
                />
                <CustomRadioButton
                  value="mean"
                  selected={radio === "mean"}
                  label="意味"
                  onClick={() => setRadio("mean")}
                />
              </Box>
              <ChipButton
                text="答えを隠す"
                selected={isChecked}
                onClick={() => setIsChecked((prev) => !prev)}
              />
            </div>
          </FormControl>
          <div style={{ padding: "0 15px" }}>
            <ScrollList maxHeight="65vh">
              {wordList.map((word, index) => (
                <WordCard
                  key={index}
                  index={index}
                  word={word}
                  sortingBy={radio}
                  onHideAnswer={isChecked}
                />
              ))}
            </ScrollList>
          </div>
        </ResponsiveBox>
      )}
    </>
  );
};

export default Transition(Voca);

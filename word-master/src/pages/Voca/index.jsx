import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
import {
  Transition,
  SubHeader,
  Loading,
  Divider,
  RowSpaceBetween,
  ScrollList,
} from "../../components";
import WordCard from "./components/WordCard";
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
    getList(`Voca/${path}/${title}`).then((list) => {
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
      <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
        <SubHeader
          title={title}
          disabled={false}
          btnName="수정"
          handleClickBtn={handleClickModifyBtn}
        />
        <Divider margin={3} />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <FormControl>
              <RowSpaceBetween>
                <RadioGroup
                  row
                  value={radio}
                  onChange={(event) => setRadio(event.target.value)}
                  sx={{ ml: 2 }}>
                  <FormControlLabel
                    value="word"
                    control={<Radio />}
                    label="단어"
                  />
                  <FormControlLabel
                    value="mean"
                    control={<Radio />}
                    label="뜻"
                  />
                </RadioGroup>
                <FormControlLabel
                  control={
                    <Checkbox onChange={() => setIsChecked((prev) => !prev)} />
                  }
                  label="답 숨기기"
                />
              </RowSpaceBetween>
            </FormControl>
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
          </>
        )}
      </Box>
    </>
  );
};

export default Transition(Voca);

import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
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
  ResponsiveBox,
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
      <ResponsiveBox>
        <SubHeader
          title={title}
          disabled={false}
          btnName="編集"
          handleClickBtn={handleClickModifyBtn}
        />
        <Divider margin={3} />
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <FormControl sx={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <RadioGroup
                  row
                  value={radio}
                  onChange={(event) => setRadio(event.target.value)}
                  sx={{ ml: 2 }}
                >
                  <FormControlLabel
                    value="word"
                    control={<Radio />}
                    label="単語"
                  />
                  <FormControlLabel
                    value="mean"
                    control={<Radio />}
                    label="意味"
                  />
                </RadioGroup>
                <FormControlLabel
                  control={
                    <Checkbox onChange={() => setIsChecked((prev) => !prev)} />
                  }
                  label="答えを隠す"
                />
              </div>
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
      </ResponsiveBox>
    </>
  );
};

export default Transition(Voca);

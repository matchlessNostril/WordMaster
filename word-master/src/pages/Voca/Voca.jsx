import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import {
  Box,
  Divider,
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
  RowSpaceBetween,
  ScrollList,
} from "../../components";
import WordCard from "../../components/Voca/Voca/WordCard";
import { getList } from "../../service/database/getList";

const Voca = () => {
  // location.state로 전달된 key, title, path 값 불러오기
  const location = useLocation();
  const { key, title, path } = location.state;

  // 단어 리스트 State
  const [wordList, setWordList] = useState([{}]);

  // 로딩 State와 Setter
  const [isLoading, setIsLoading] = useState(false);

  // 마운트 시, 단어 리스트 데이터 불러오기
  useEffect(() => {
    setIsLoading(true);
    getList(`Voca/${path}/${title}`).then((list) => {
      setWordList(list);
      setIsLoading(false);
    });
  }, []);

  // navigate
  const navigate = useNavigate();

  // 수정 버튼 핸들러 함수
  const onClickModifyBtn = useCallback(() => {
    navigate("/SaveVoca", {
      state: {
        mode: "Modify",
        path: path,
        key: key,
        title: title,
      },
    });
  }, []);

  // 단어, 뜻 선택 Radio State
  const [radio, setRadio] = useState("word");

  // 답 숨기기 체크박스 State
  const [checked, setChecked] = useState(false);

  return (
    <>
      <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
        <SubHeader
          title={title}
          disabled={false}
          btnName="수정"
          handleClickBtn={onClickModifyBtn}
        />
        <Divider sx={{ mt: 3, mb: 3 }} />
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
                  sx={{ ml: 2 }}
                >
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
                    <Checkbox onChange={() => setChecked((prev) => !prev)} />
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
                  onHideAnswer={checked}
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

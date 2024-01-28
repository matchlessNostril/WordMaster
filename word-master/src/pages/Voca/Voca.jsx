// Router
import { useLocation, useNavigate } from "react-router-dom";
// Hook
import { useEffect, useState, useCallback } from "react";
// Custom Hook
import useLoading from "../../hooks/useLoading";
// MUI
import {
  Box,
  Divider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
} from "@mui/material";
// Component
import SubHeader from "../../components/SubHeader";
import Loading from "../../components/Loading";
import WordCard from "../../components/Voca/Voca/WordCard";
// Layout
import RowSpaceBetween from "../../layout/RowSpaceBetween";
import ScrollList from "../../layout/ScrollList";
// API
import { getList } from "../../service/database/getList";

const Voca = () => {
  // location.state로 전달된 key, title, path 값 불러오기
  const location = useLocation();
  const key = location.state.key;
  const title = location.state.title;
  const path = location.state.path;

  // 단어 리스트 State
  const [wordList, setWordList] = useState([{}]);

  // 로딩 State와 Setter
  const [onLoading, setOnLoading] = useLoading();

  // 마운트 시, 단어 리스트 데이터 불러오기
  useEffect(() => {
    setOnLoading(true);
    getList(`Voca/${path}/${title}`).then((list) => {
      setWordList(list);
      setOnLoading(false);
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
          onClickHandler={onClickModifyBtn}
        />
        <Divider sx={{ mt: 3, mb: 3 }} />
        {onLoading ? (
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

export default Voca;

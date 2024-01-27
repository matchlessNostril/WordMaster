// Router
import { useLocation, useNavigate } from "react-router-dom";
// Hook
import { useState, useCallback } from "react";
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
// Layout
import RowSpaceBetween from "../../layout/RowSpaceBetween";

const Voca = () => {
  // location.state로 전달된 key, title, path 값 불러오기
  const location = useLocation();
  const key = location.state.key;
  const title = location.state.title;
  const path = location.state.path;

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
        <FormControl>
          <RowSpaceBetween>
            <RadioGroup
              row
              value={radio}
              onChange={(event) => setRadio(event.target.value)}
              sx={{ ml: 2 }}
            >
              <FormControlLabel value="word" control={<Radio />} label="단어" />
              <FormControlLabel value="mean" control={<Radio />} label="뜻" />
            </RadioGroup>
            <FormControlLabel
              control={
                <Checkbox onChange={() => setChecked((prev) => !prev)} />
              }
              label="답 숨기기"
            />
          </RowSpaceBetween>
        </FormControl>
      </Box>
    </>
  );
};

export default Voca;

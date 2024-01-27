// Router
import { useLocation, useNavigate } from "react-router-dom";
// Hook
import { useCallback } from "react";
// MUI
import { Box, Divider } from "@mui/material";
// Component
import SubHeader from "../../components/SubHeader";

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
      </Box>
    </>
  );
};

export default Voca;

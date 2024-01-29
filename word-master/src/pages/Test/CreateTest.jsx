// Hook
import { useState } from "react";
// MUI
import { Box, TextField, Divider, Typography, Button } from "@mui/material";
// Component
import SubHeader from "../../components/SubHeader";

const Dir = ({ index }) => {
  const [showChild, setShowChild] = useState(false);

  return (
    <Box sx={{ ml: 2 }}>
      박스 {index}
      <Button onClick={() => setShowChild((prev) => !prev)}>버튼</Button>
      {showChild && <ChildDir index={index + 1} />}
    </Box>
  );
};

const ChildDir = ({ index }) => {
  return <Dir index={index} />;
};

const CreateTest = () => {
  return (
    <>
      <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
        <SubHeader
          title="테스트 만들기"
          disabled={false}
          btnName="만들기"
          onClickHandler={() => {}}
        />
        <Box mt={2} p={1}>
          <TextField
            label="테스트 이름"
            variant="outlined"
            sx={{ width: "100%" }}
          />
        </Box>
        <Divider sx={{ mt: 2, mb: 2 }} />
        <Box sx={{ pl: 2, pr: 2 }}>
          <Typography variant="h6" mb={1}>
            <strong>단어장 선택</strong>
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: "80vw" }}>
            테스트 생성 시점 기준 단어 세트로 생성되며, 이후 단어 세트가
            업데이트 되어도 테스트 내용은 바뀌지 않습니다.
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default CreateTest;

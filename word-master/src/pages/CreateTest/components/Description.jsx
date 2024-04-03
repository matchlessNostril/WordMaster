import React from "react";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";

const StyledUl = styled.ul`
  padding-left: 1rem;
  max-width: 80vw;

  & > li {
    font-size: 0.9rem;
  }
  & > li::marker {
    font-size: 10px;
  }
`;

const Description = () => {
  return (
    <Box sx={{ pl: 2, mb: 2 }}>
      <Typography variant="subtitle1">
        <strong>단어장 선택</strong>
      </Typography>
      <StyledUl>
        <li>테스트 생성 시점 기준 단어 세트로 생성됩니다.</li>
        <li>이후 단어 세트가 업데이트 되어도 반영되지 않습니다.</li>
      </StyledUl>
    </Box>
  );
};

export default React.memo(Description);

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
        <strong>単語帳の選択</strong>
      </Typography>
      <StyledUl>
        <li>テスト作成時点の単語帳で作成されます。</li>
        <li>その後、単語帳が更新されても反映されません。</li>
      </StyledUl>
    </Box>
  );
};

export default React.memo(Description);

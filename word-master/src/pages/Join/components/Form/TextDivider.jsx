import React from "react";
import { Divider } from "@mui/material";

const TextDivider = ({ method }) => {
  return (
    <Divider sx={{ p: 3, fontSize: "small" }}>メールアドレスで{method}</Divider>
  );
};

export default React.memo(TextDivider);

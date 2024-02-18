import React from "react";
import { Divider } from "@mui/material";

const TextDivider = ({ method }) => {
  return <Divider sx={{ p: 3, fontSize: "small" }}>이메일로 {method}</Divider>;
};

export default React.memo(TextDivider);

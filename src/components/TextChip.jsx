import React from "react";
import { Chip } from "@mui/material";

const TextChip = (props) => {
  return <Chip {...props} />;
};

export default React.memo(TextChip);

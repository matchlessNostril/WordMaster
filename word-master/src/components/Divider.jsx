import React from "react";
import { Divider as MuiDivider } from "@mui/material";

const Divider = ({ margin }) => {
  return <MuiDivider sx={{ mt: margin, mb: margin }} />;
};

export default React.memo(Divider);

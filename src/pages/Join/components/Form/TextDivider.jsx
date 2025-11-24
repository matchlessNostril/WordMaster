import React from "react";
import { Divider, useTheme } from "@mui/material";

const TextDivider = ({ method }) => {
  const theme = useTheme();

  return (
    <Divider
      sx={{
        py: 4,
        fontSize: "small",
        color: theme.palette.slate[500],
        borderColor: theme.palette.slate[500],
        "&::before, &::after": {
          borderColor: theme.palette.slate[500],
        },
      }}
    >
      メールアドレスで{method}
    </Divider>
  );
};

export default React.memo(TextDivider);

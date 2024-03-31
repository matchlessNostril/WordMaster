import React from "react";
import { ListItem, TextField } from "@mui/material";

const InputField = React.memo(({ vocaName, setVocaName }) => {
  return (
    <ListItem>
      <TextField
        label="단어장 이름"
        variant="outlined"
        value={vocaName}
        onChange={(event) => setVocaName(event.target.value)}
        autoComplete="off"
        sx={{ width: "100%" }}
      />
    </ListItem>
  );
});

export default InputField;

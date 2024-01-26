// Hook
import { useState, useEffect } from "react";
// MUI
import { Box, TextField, ListItem, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Component
import Header from "../../components/Voca/CreateOrModifyVoca/Header";
import WordCard from "../../components/Voca/CreateOrModifyVoca/WordCard";
// Layout
import ScrollList from "../../layout/ScrollList";

const CreateVoca = () => {
  // 단어장 이름 State
  const [vocaName, setVocaName] = useState("");

  // -----------확인용---------
  useEffect(() => {
    console.log(vocaName);
  }, [vocaName]);

  const numbers = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
      <Header disabled={false} onClickHandler={() => {}} />
      <ScrollList>
        <ListItem>
          <TextField
            label="단어장 이름"
            variant="outlined"
            value={vocaName}
            onChange={(event) => setVocaName(event.target.value)}
            sx={{ width: "100%" }}
          />
        </ListItem>
        {numbers.map((value) => (
          <WordCard index={value} />
        ))}
        <ListItem sx={{ display: "flex", justifyContent: "center" }}>
          <IconButton onClick={() => {}}>
            <AddCircleIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </ListItem>
      </ScrollList>
    </Box>
  );
};

export default CreateVoca;

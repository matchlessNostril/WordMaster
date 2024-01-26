// MUI
import { Box, TextField, ListItem, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Component
import Header from "../../components/Voca/CreateOrModifyVoca/Header";
import WordCard from "../../components/Voca/CreateOrModifyVoca/WordCard";
// Layout
import ScrollList from "../../layout/ScrollList";

const CreateVoca = () => {
  const numbers = Array.from({ length: 20 }, (_, index) => index + 1);

  return (
    <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
      <Header disabled={false} onClickHandler={() => {}} />
      <ScrollList>
        <ListItem>
          <TextField
            label="단어장 이름"
            variant="outlined"
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

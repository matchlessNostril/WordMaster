// MUI
import { Box, TextField, ListItem } from "@mui/material";
// Component
import Header from "../../components/Voca/CreateOrModifyVoca/Header";
// Layout
import ScrollList from "../../layout/ScrollList";

const CreateVoca = () => {
  return (
    <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
      <Header isMdisabled={false} onClickHandler={() => {}} />
      <ScrollList>
        <ListItem>
          <TextField
            label="단어장 이름"
            variant="standard"
            sx={{ width: "100%" }}
          />
        </ListItem>
      </ScrollList>
    </Box>
  );
};

export default CreateVoca;

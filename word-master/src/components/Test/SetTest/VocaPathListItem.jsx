// MUI
import { Stack, ListItem, Typography } from "@mui/material";

const VocaPathListItem = ({ dirPath, vocaList }) => {
  const replacedDirPath = dirPath.replace(/\//g, " / ");

  return (
    <ListItem key={dirPath} sx={{ pl: 0 }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={require("../../../assets/icons/folder_opened.png")}
            style={{ width: "20px", height: "20px", marginRight: "-5px" }}
          />
          <Typography variant="body2">{replacedDirPath}</Typography>
        </Stack>
        {vocaList.map((value, index) => (
          <Stack key={index} direction="row" alignItems="center" spacing={2}>
            <img
              src={require("../../../assets/icons/document.png")}
              style={{
                width: "20px",
                height: "20px",
                marginLeft: "30px",
                marginRight: "-5px",
              }}
            />
            <Typography variant="body2">{value}</Typography>
          </Stack>
        ))}
      </Stack>
    </ListItem>
  );
};

export default VocaPathListItem;

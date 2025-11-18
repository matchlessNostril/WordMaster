import React from "react";
import { Box, Typography, Stack, ListItem } from "@mui/material";
import { ScrollList } from "../../../components";

const VocaList = ({ vocaPaths }) => {
  return (
    <Box sx={{ pl: 1, maxWidth: "85vw" }}>
      <Typography variant="subtitle1">
        <strong>単語帳リスト</strong>
      </Typography>
      <ScrollList maxHeight="25vh">
        {vocaPaths.length > 0 &&
          vocaPaths.map((value, index) => (
            <VocaPathListItem
              key={index}
              dirPath={value.dirPath}
              vocaList={value.vocaList}
            />
          ))}
      </ScrollList>
    </Box>
  );
};

export default React.memo(VocaList);

const VocaPathListItem = ({ dirPath, vocaList }) => {
  const replacedDirPath = dirPath ? dirPath.replace(/\//g, " / ") : null;

  return (
    <ListItem key={dirPath} sx={{ pl: 0 }}>
      <Stack spacing={2}>
        {replacedDirPath && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <img
              src={require("../../../assets/icons/folder_opened.png")}
              alt="開いたフォルダアイコン"
              style={{ width: "20px", height: "20px", marginRight: "-5px" }}
            />
            <Typography variant="body2">{replacedDirPath}</Typography>
          </Stack>
        )}
        {vocaList.map((value, index) => (
          <Stack key={index} direction="row" alignItems="center" spacing={2}>
            <img
              src={require("../../../assets/icons/document.png")}
              alt="単語帳アイコン"
              style={{
                width: "20px",
                height: "20px",
                marginLeft: replacedDirPath ? "30px" : "0px",
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

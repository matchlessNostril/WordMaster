import React from "react";
import { Box, Typography, Stack, ListItem } from "@mui/material";
import { ScrollList } from "../../../components";

const VocaList = ({ vocaPaths }) => {
  return (
    <Box sx={{ pl: 1, maxWidth: "85vw" }}>
      <Typography variant="subtitle1">
        <strong>단어장 리스트</strong>
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
  const replacedDirPath = dirPath.replace(/\//g, " / ");

  return (
    <ListItem key={dirPath} sx={{ pl: 0 }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={require("../../../assets/icons/folder_opened.png")}
            alt="열린 폴더 아이콘"
            style={{ width: "20px", height: "20px", marginRight: "-5px" }}
          />
          <Typography variant="body2">{replacedDirPath}</Typography>
        </Stack>
        {vocaList.map((value, index) => (
          <Stack key={index} direction="row" alignItems="center" spacing={2}>
            <img
              src={require("../../../assets/icons/document.png")}
              alt="단어장 아이콘"
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

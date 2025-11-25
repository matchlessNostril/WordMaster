import React from "react";
import { Box, Stack, ListItem, useTheme } from "@mui/material";
import {
  ScrollList,
  VocaListItemIconBox,
  StyledCard,
} from "../../../components";

const VocaList = ({ vocaPaths }) => {
  const theme = useTheme();

  return (
    <StyledCard minHeight="">
      <Box
        sx={{
          pl: 1,
          maxWidth: "85vw",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        <strong
          style={{
            fontSize: "1.25rem",
            color: theme.palette.textColors.slate200,
            marginBottom: "8px",
          }}
        >
          単語帳一覧
        </strong>
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
    </StyledCard>
  );
};

export default React.memo(VocaList);

const VocaPathListItem = ({ dirPath, vocaList }) => {
  const replacedDirPath = dirPath ? dirPath.replace(/\//g, " / ") : null;
  const theme = useTheme();

  return (
    <ListItem key={dirPath} sx={{ pl: 0 }}>
      <Stack spacing={2}>
        {replacedDirPath && (
          <Stack direction="row" alignItems="center" spacing={2}>
            <div style={{ marginRight: "-5px" }}>
              <VocaListItemIconBox isDir />
            </div>
            <span
              style={{
                fontSize: "0.875rem",
                color: theme.palette.textColors.slate200,
              }}
            >
              {replacedDirPath}
            </span>
          </Stack>
        )}
        {vocaList.map((value, index) => (
          <Stack key={index} direction="row" alignItems="center" spacing={2}>
            <div
              style={{
                marginLeft: replacedDirPath ? "30px" : "0px",
                marginRight: "-5px",
              }}
            >
              <VocaListItemIconBox isDir={false} />
            </div>
            <span
              style={{
                fontSize: "0.875rem",
                color: theme.palette.textColors.slate200,
              }}
            >
              {value}
            </span>
          </Stack>
        ))}
      </Stack>
    </ListItem>
  );
};

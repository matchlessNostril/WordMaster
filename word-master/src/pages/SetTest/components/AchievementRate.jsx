import React from "react";
import { Stack, Typography, Chip } from "@mui/material";

const AchievementRate = ({ wordRound, meanRound }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="subtitle1">
        <strong>현재 달성률</strong>
      </Typography>
      <Chip label={`단어 ${wordRound}회독`} size="small" />
      <Chip label={`뜻 ${meanRound}회독`} size="small" />
    </Stack>
  );
};

export default React.memo(AchievementRate);

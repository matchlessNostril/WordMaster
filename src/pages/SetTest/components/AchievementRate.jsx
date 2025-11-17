import React from "react";
import { Stack, Typography, Chip } from "@mui/material";

const AchievementRate = ({ wordRound, meanRound }) => {
  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <Typography variant="subtitle1">
        <strong>現在の達成率</strong>
      </Typography>
      <Chip label={`単語 ${wordRound}回`} size="small" />
      <Chip label={`意味 ${meanRound}回`} size="small" />
    </Stack>
  );
};

export default React.memo(AchievementRate);

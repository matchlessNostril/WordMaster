import React from "react";
import { Grid, FormControlLabel, Checkbox } from "@mui/material";

const PronunciationCheckbox = React.memo(({ isChecked, handleCheck }) => {
  return (
    <Grid item xs={12} sm={6}>
      <FormControlLabel
        control={<Checkbox checked={isChecked} onChange={handleCheck} />}
        label="발음 추가"
        sx={{ m: 0, mt: 1 }}
      />
    </Grid>
  );
});

export default PronunciationCheckbox;

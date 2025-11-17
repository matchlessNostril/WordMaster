import React from "react";
import {
  Box,
  Stack,
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Checkbox,
  TextField,
  InputAdornment,
} from "@mui/material";

const Form = ({ radio, handleRadio, timer, handleTimer }) => {
  return (
    <Box sx={{ pl: 1 }}>
      <Typography variant="subtitle1">
        <strong>テスト設定</strong>
      </Typography>
      <FormControl>
        <RadioGroup
          row
          value={radio}
          onChange={(event) => handleRadio(event.target.value)}
        >
          <FormControlLabel
            value="word"
            control={<Radio />}
            label="単語テスト"
          />
          <FormControlLabel
            value="mean"
            control={<Radio />}
            label="意味テスト"
          />
        </RadioGroup>
        <Stack direction="row">
          <FormControlLabel
            control={<Checkbox onChange={() => handleTimer("ON")} />}
            label="タイマー"
          />
          {timer.onTimer && (
            <TextField
              variant="standard"
              autoComplete="off"
              onChange={(event) => handleTimer("TIME", event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">(秒)</InputAdornment>
                ),
              }}
              sx={{ marginLeft: "10px" }}
            />
          )}
        </Stack>
      </FormControl>
    </Box>
  );
};

export default React.memo(
  Form,
  (prevProps, nextProps) =>
    prevProps.radio === nextProps.radio && prevProps.timer === nextProps.timer
);

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
        <strong>테스트 설정</strong>
      </Typography>
      <FormControl>
        <RadioGroup
          row
          value={radio}
          onChange={(event) => handleRadio(event.target.value)}>
          <FormControlLabel
            value="word"
            control={<Radio />}
            label="단어 테스트"
          />
          <FormControlLabel
            value="mean"
            control={<Radio />}
            label="뜻 테스트"
          />
        </RadioGroup>
        <Stack direction="row">
          <FormControlLabel
            control={<Checkbox onChange={() => handleTimer("ON")} />}
            label="타이머"
          />
          {timer.onTimer && (
            <TextField
              variant="standard"
              autoComplete="off"
              onChange={(event) => handleTimer("TIME", event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">(초)</InputAdornment>
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

import React from "react";
import { useTheme } from "@mui/material/styles";
import { Grid, FormControlLabel, Checkbox, Box } from "@mui/material";
import { InputField } from "./index";

const TextFieldWithCheckbox = React.memo(
  ({ checked, label, type, value, handleCheck, handleInput }) => {
    const theme = useTheme();

    return (
      <Grid item xs={12}>
        <Box
          sx={{
            mt: 1,
            display: "flex",
            gap: 1,
            alignItems: "center",
            flexWrap: { xs: "wrap", sm: "nowrap" },
          }}
        >
          <FormControlLabel
            control={<Checkbox checked={checked} onChange={handleCheck} />}
            label={label}
            sx={{ m: 0, minWidth: "fit-content" }}
          />
          {checked && (
            <Box
              sx={{
                flex: 1,
                width: "100%",
                [theme.breakpoints.down("sm")]: {
                  mt: -1.2,
                },
              }}
            >
              <InputField
                label={label}
                value={value}
                type={type}
                handleInput={handleInput}
              />
            </Box>
          )}
        </Box>
      </Grid>
    );
  }
);

export default TextFieldWithCheckbox;

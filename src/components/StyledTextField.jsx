import React from "react";
import { TextField, Box, useTheme } from "@mui/material";

const StyledTextField = ({
  value,
  onChange,
  labelText,
  placeholder,
  helperText,
  error = false,
  startAdornment,
  endAdornment,
  type = "text",
  autoComplete = "off",
  ...props
}) => {
  const theme = useTheme();

  return (
    <Box>
      {labelText && (
        <label
          style={{
            display: "block",
            color: theme.palette.textColors.slate300,
            fontSize: "0.875rem",
            fontWeight: 500,
            marginBottom: "0.5rem",
          }}
        >
          {labelText}
        </label>
      )}
      <TextField
        variant="outlined"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        helperText={helperText}
        error={error}
        type={type}
        autoComplete={autoComplete}
        InputProps={{
          startAdornment,
          endAdornment,
          sx: {
            backgroundColor: `${theme.palette.slate[900]}80`,
            borderRadius: "8px",
            color: theme.palette.textColors.slate200,
            "& .MuiOutlinedInput-input": {
              paddingLeft: startAdornment ? "8px" : "16px",
              paddingRight: endAdornment ? "48px" : "16px",
              paddingTop: "12px",
              paddingBottom: "12px",
              color: theme.palette.textColors.slate200,
              "&::placeholder": {
                fontSize: "0.875rem",
              },
            },
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: error
                ? theme.palette.red[400]
                : theme.palette.slate[700],
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: error
                ? theme.palette.red[400]
                : theme.palette.slate[700],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: theme.palette.cyan[500],
              borderWidth: "1px",
            },
            "&.Mui-focused": {
              boxShadow: `0 0 0 2px ${theme.palette.cyan[500]}33`,
            },
            "&.MuiInputBase-multiline": {
              padding: 0,
            },
            transition: "all 0.3s ease",
          },
        }}
        InputLabelProps={{
          sx: {
            color: theme.palette.textColors.slate300,
          },
        }}
        FormHelperTextProps={{
          sx: {
            color: error
              ? theme.palette.red[400]
              : theme.palette.textColors.slate400,
          },
        }}
        sx={{
          width: "100%",
          ...props.sx,
        }}
        {...props}
      />
    </Box>
  );
};

export default StyledTextField;

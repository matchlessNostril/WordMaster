import React from "react";
import { StyledTextField } from "../../../../components";

const InputField = React.memo(
  ({ label, value, autoFocus = false, type, handleInput, placeholder }) => {
    return (
      <StyledTextField
        labelText={label}
        value={value}
        placeholder={placeholder}
        onChange={(event) => handleInput(event, type)}
        autoFocus={autoFocus}
        multiline
      />
    );
  }
);

export default InputField;

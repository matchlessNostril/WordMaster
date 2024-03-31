import React, { useState } from "react";
import { CircularProgress } from "@mui/material";
import StyledButton from "./StyledButton";

const SubmitBtn = ({ method, disabled, handleSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <StyledButton
      variant="contained"
      disabled={disabled}
      onClick={async () => {
        setIsLoading(true);
        await handleSubmit();
        setIsLoading(false);
      }}
    >
      {isLoading ? (
        <CircularProgress size={20} sx={{ color: "white" }} />
      ) : (
        `${method}`
      )}
    </StyledButton>
  );
};

export default React.memo(SubmitBtn);

import React from "react";
import { useLoading } from "../../../../hooks";
import { CircularProgress } from "@mui/material";
import StyledButton from "./StyledButton";

const SubmitBtn = ({ method, disabled, handleSubmit }) => {
  const [onLoading, setOnLoading] = useLoading();

  return (
    <StyledButton
      variant="contained"
      disabled={disabled}
      onClick={async () => {
        setOnLoading(true);
        await handleSubmit();
        setOnLoading(false);
      }}>
      {onLoading ? (
        <CircularProgress size={20} sx={{ color: "white" }} />
      ) : (
        `${method}`
      )}
    </StyledButton>
  );
};

export default React.memo(SubmitBtn);

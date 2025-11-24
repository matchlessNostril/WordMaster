import React, { useState } from "react";
import { GradientButton } from "../../../../components";

const SubmitBtn = ({ method, disabled, handleSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <GradientButton
      fullWidth
      disabled={disabled || isLoading}
      onClick={async () => {
        setIsLoading(true);
        await handleSubmit();
        setIsLoading(false);
      }}
      isLoading={isLoading}
      text={method}
    />
  );
};

export default React.memo(SubmitBtn);

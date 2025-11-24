import { useState } from "react";
import { useTheme } from "@mui/material";
import { Transition } from "../../components";
import { MethodToggle, Form } from "./components";

const Join = () => {
  const [method, setMethod] = useState("ログイン");
  const theme = useTheme();

  return (
    <div
      style={{
        backgroundColor: `${theme.palette.slate[800]}80`,
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderRadius: "16px",
        border: `1px solid ${theme.palette.slate[700]}80`,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        padding: "32px",
      }}
    >
      <MethodToggle method={method} setMethod={setMethod} />
      <Form method={method} />
    </div>
  );
};

export default Transition(Join);

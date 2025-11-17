import { useState } from "react";
import { Transition } from "../../components";
import { MethodToggle, Form } from "./components";

const Join = () => {
  const [method, setMethod] = useState("ログイン");

  return (
    <>
      <MethodToggle method={method} setMethod={setMethod} />
      <Form method={method} />
    </>
  );
};

export default Transition(Join);

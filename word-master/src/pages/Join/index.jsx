import { useState } from "react";
import { Transition } from "../../components";
import { MethodToggle, Form } from "./components";

const Join = () => {
  const [method, setMethod] = useState("로그인");

  return (
    <>
      <MethodToggle method={method} setMethod={setMethod} />
      <Form method={method} />
    </>
  );
};

export default Transition(Join);

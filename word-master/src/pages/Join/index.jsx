import { useState } from "react";
import Transition from "../../components/Transition";
import MethodToggle from "./components/MethodToggle";
import Form from "./components/Form";

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

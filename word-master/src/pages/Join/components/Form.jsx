// Component
import { Stack } from "@mui/material";
import GoogleBtn from "./GoogleBtn";
// API
import { googleAuth } from "../../../service/auth";

// prop이 method 밖에 없기 때문에 이름 props가 아닌 method로
const Form = (method) => {
  return (
    <Stack direction="column" spacing={3}>
      <GoogleBtn {...method} onClickGoogleAuth={googleAuth} />
    </Stack>
  );
};

export default Form;

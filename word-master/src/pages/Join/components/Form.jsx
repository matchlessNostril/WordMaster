// Component
import { Stack } from "@mui/material";
import GoogleBtn from "./GoogleBtn";
import TextDivider from "./TextDivider";
// API
import { googleAuth } from "../../../service/auth";
const Form = ({ method }) => {

  return (
    <Stack direction="column" spacing={3}>
      <GoogleBtn method={method} onClickGoogleAuth={googleAuth} />
      <TextDivider method={method} />
    </Stack>
  );
};

export default Form;

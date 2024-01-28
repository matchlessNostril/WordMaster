import { useState } from "react";
import { Box, Button } from "@mui/material";

const Dir = ({ index }) => {
  const [showChild, setShowChild] = useState(false);

  return (
    <Box sx={{ ml: 2 }}>
      박스 {index}
      <Button onClick={() => setShowChild((prev) => !prev)}>버튼</Button>
      {showChild && <ChildDir index={index + 1} />}
    </Box>
  );
};

const ChildDir = ({ index }) => {
  return <Dir index={index} />;
};

const CreateTest = () => {
  return (
    <>
      <Dir index={0} />
    </>
  );
};

export default CreateTest;

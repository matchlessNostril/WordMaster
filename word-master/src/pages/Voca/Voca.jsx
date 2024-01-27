// Router
import { useLocation, useNavigate } from "react-router-dom";
// MUI
import { Box, Button } from "@mui/material";

const Voca = () => {
  // location.state로 전달된 key, title, path 값 불러오기
  const location = useLocation();
  const key = location.state.key;
  const title = location.state.title;
  const path = location.state.path;

  // navigate
  const navigate = useNavigate();

  return (
    <>
      <Box>
        <Button
          variant="outlined"
          onClick={() =>
            navigate("/SaveVoca", {
              state: {
                mode: "Modify",
                path: path,
                key: key,
                title: title,
              },
            })
          }
        >
          수정
        </Button>
      </Box>
    </>
  );
};

export default Voca;

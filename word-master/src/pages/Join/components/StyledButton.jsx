import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

// 반응형 버튼 UI
const StyledButton = styled(Button)(({ theme }) => ({
  height: "50px",
  borderRadius: "10px",
  [theme.breakpoints.down("sm")]: {
    width: "300px",
  },
  [theme.breakpoints.up("sm")]: {
    width: "400px",
  },
}));

export default StyledButton;

// Router
import { useNavigate } from "react-router-dom";
// Context
import { AuthContext } from "../../contexts/AuthContext";
// Hook
import { useContext } from "react";
// MUI
import { Box, Typography, IconButton } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
// Component
import Transition from "../../components/Transition";
// Layout
import RowSpaceBetween from "../../layout/RowSpaceBetween";

const TestList = () => {
  // 사용자 정보
  const { displayName } = useContext(AuthContext);

  // navigate
  const navigate = useNavigate();

  return (
    <>
      <Box sx={{ minWidth: "85vw", minHeight: "85vh" }}>
        <RowSpaceBetween>
          <Typography variant="h5" ml={2}>
            <strong>{displayName}</strong>님의 테스트
          </Typography>
          <IconButton onClick={() => navigate("/CreateTest")}>
            <AddCircleIcon sx={{ fontSize: "40px" }} />
          </IconButton>
        </RowSpaceBetween>
      </Box>
    </>
  );
};

export default Transition(TestList);

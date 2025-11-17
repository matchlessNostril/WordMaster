import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography, IconButton } from "@mui/material";
import { RowSpaceBetween } from "../../../components";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Header = () => {
  const navigate = useNavigate();
  const { displayName } = useContext(AuthContext);

  return (
    <RowSpaceBetween>
      <Typography variant="h5" ml={2}>
        <strong>{displayName}</strong>様のテスト
      </Typography>
      <IconButton onClick={() => navigate("/CreateTest")}>
        <AddCircleIcon sx={{ fontSize: "40px" }} />
      </IconButton>
    </RowSpaceBetween>
  );
};

export default React.memo(Header);

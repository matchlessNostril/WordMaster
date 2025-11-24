import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography, useTheme } from "@mui/material";
import { RowSpaceBetween, GradientButton } from "../../../components";
import AddIcon from "@mui/icons-material/Add";

const Header = () => {
  const navigate = useNavigate();
  const { displayName } = useContext(AuthContext);
  const theme = useTheme();

  return (
    <RowSpaceBetween>
      <Typography
        variant="h5"
        sx={{ color: theme.palette.textColors.slate100 }}
      >
        <strong>{displayName}</strong>様のテスト一覧
      </Typography>
      <GradientButton
        onClick={() => navigate("/CreateTest")}
        icon={<AddIcon />}
      />
    </RowSpaceBetween>
  );
};

export default React.memo(Header);

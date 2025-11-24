import { useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { usePopOver } from "../../../hooks";
import { AuthContext } from "../../../contexts/AuthContext";
import { Stack, Typography, IconButton, useTheme, alpha } from "@mui/material";
import {
  RowSpaceBetween,
  BtnPopover,
  GradientButton,
} from "../../../components";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AddIcon from "@mui/icons-material/Add";
import FolderSharpIcon from "@mui/icons-material/FolderSharp";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";

const Header = ({
  path,
  currentDirName,
  handleClickCreateDir,
  handleClickOpenModal,
}) => {
  const { displayName } = useContext(AuthContext);
  const theme = useTheme();
  const navigate = useNavigate();
  const [popoverAnchor, setPopoverAnchor, handleClickPopoverBtn] = usePopOver();

  const modalContents = useMemo(
    () => ({
      title: "新規フォルダ作成",
      textField: {
        label: "フォルダ名",
      },
      btnName: "作成",
      handleClickBtn: handleClickCreateDir,
    }),
    []
  );

  const popoverBtns = useMemo(
    () => [
      {
        name: "新規フォルダを作成",
        handleClick: () => {
          setPopoverAnchor(null);
          handleClickOpenModal(modalContents);
        },
        icon: <FolderSharpIcon sx={{ color: theme.palette.amber[250] }} />,
      },
      {
        name: "新規単語帳を作成",
        handleClick: () => {
          setPopoverAnchor(null);
          navigate("/SaveVoca", {
            state: {
              mode: "Create",
              path,
            },
          });
        },
        icon: <DescriptionSharpIcon sx={{ color: theme.palette.blue[400] }} />,
      },
    ],
    []
  );

  return (
    <>
      <RowSpaceBetween>
        {path !== "root" ? (
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                padding: "6px",
                borderRadius: "10px",
                color: theme.palette.textColors.slate300,
                transition: "all 0.2s ease",
                "&:hover": {
                  color: theme.palette.textColors.slate100,
                  backgroundColor: alpha(theme.palette.slate[700], 0.4),
                },
                marginRight: "12px",
              }}
            >
              <NavigateBeforeIcon
                sx={{
                  fontSize: "40px",
                  "& > button": { padding: 0, paddingRight: "4px" },
                  color: theme.palette.textColors.slate100,
                }}
              />
            </IconButton>
            <Typography
              variant="h5"
              sx={{ color: theme.palette.textColors.slate100 }}
            >
              {currentDirName}
            </Typography>
          </Stack>
        ) : (
          <Typography
            variant="h5"
            sx={{ color: theme.palette.textColors.slate100 }}
          >
            <strong>{displayName}</strong> 様の単語帳一覧
          </Typography>
        )}
        <GradientButton onClick={handleClickPopoverBtn} icon={<AddIcon />} />
        <BtnPopover
          anchor={popoverAnchor}
          setAnchor={setPopoverAnchor}
          buttons={popoverBtns}
        />
      </RowSpaceBetween>
    </>
  );
};

export default Header;

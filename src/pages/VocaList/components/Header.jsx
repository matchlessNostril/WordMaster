import { useNavigate } from "react-router-dom";
import { useContext, useMemo } from "react";
import { usePopOver } from "../../../hooks";
import { AuthContext } from "../../../contexts/AuthContext";
import { Stack, Typography, IconButton } from "@mui/material";
import { RowSpaceBetween, BtnPopover } from "../../../components";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Header = ({
  path,
  currentDirName,
  handleClickCreateDir,
  handleClickOpenModal,
}) => {
  const { displayName } = useContext(AuthContext);

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
    [handleClickCreateDir]
  );

  const popoverBtns = useMemo(
    () => [
      {
        name: "新規フォルダを作成",
        handleClick: () => {
          setPopoverAnchor(null);
          handleClickOpenModal(modalContents);
        },
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
      },
    ],
    [modalContents]
  );

  return (
    <>
      <RowSpaceBetween>
        {path !== "root" ? (
          <Stack direction="row" alignItems="center">
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ padding: 0, marginRight: "6px" }}
            >
              <NavigateBeforeIcon
                sx={{
                  fontSize: "40px",
                  "& > button": { padding: 0, paddingRight: "4px" },
                }}
              />
            </IconButton>
            <Typography variant="h5">{currentDirName}</Typography>
          </Stack>
        ) : (
          <Typography variant="h5">
            <strong>{displayName}</strong> 様の単語帳一覧
          </Typography>
        )}
        <IconButton onClick={handleClickPopoverBtn}>
          <AddCircleIcon sx={{ fontSize: "40px" }} />
        </IconButton>
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

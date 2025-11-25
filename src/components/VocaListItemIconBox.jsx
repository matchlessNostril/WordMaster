import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material";
import FolderSharpIcon from "@mui/icons-material/FolderSharp";
import DescriptionSharpIcon from "@mui/icons-material/DescriptionSharp";

const VocaListItemIconBox = ({ isDir }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: "12px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: isDir
          ? alpha(theme.palette.amber[400], 0.2)
          : alpha(theme.palette.slate[500], 0.2),
        color: isDir ? theme.palette.amber[400] : theme.palette.slate[400],
        flexShrink: 0,
      }}
    >
      {isDir ? (
        <FolderSharpIcon
          sx={{
            width: 24,
            height: 24,
            color: theme.palette.amber[250],
          }}
        />
      ) : (
        <DescriptionSharpIcon
          sx={{ width: 24, height: 24, color: theme.palette.blue[400] }}
        />
      )}
    </Box>
  );
};

export default VocaListItemIconBox;

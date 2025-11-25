import { useTheme } from "@mui/material/styles";
import { List } from "@mui/material";

const ScrollList = ({ maxHeight, children }) => {
  const theme = useTheme();

  return (
    <List
      sx={{
        maxHeight: { maxHeight },
        width: "100%",
        maxWidth: "92vw",
        overflow: "auto",
        pr: 1,
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.slate[600],
          borderRadius: "12px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: theme.palette.slate[500],
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: theme.palette.slate[800],
          borderRadius: "12px",
        },
      }}
    >
      {children}
    </List>
  );
};

export default ScrollList;

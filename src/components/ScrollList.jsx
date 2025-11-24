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
        padding: "8px",
        borderRadius: "24px",
        backgroundColor: `${theme.palette.slate[900]}60`,
        border: `1px solid ${theme.palette.slate[800]}80`,
        boxShadow: "0 25px 50px -25px rgba(0, 0, 0, 0.75)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        overflow: "auto",
        pr: 1,
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: theme.palette.slate[600],
          borderRadius: "12px",
          border: `2px solid ${theme.palette.slate[900]}`,
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

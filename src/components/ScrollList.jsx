import { useTheme } from "@mui/material/styles";
import { List } from "@mui/material";

const ScrollList = ({ maxHeight, children }) => {
  const theme = useTheme();

  return (
    <List
      sx={{
        maxHeight: { maxHeight },
        [theme.breakpoints.down("sm")]: {
          maxWidth: "90vw",
        },
        [theme.breakpoints.up("sm")]: {
          maxWidth: "80vw",
        },
        overflow: "auto",
        pr: 1,
        borderRadius: 2,
        "&::-webkit-scrollbar": {
          width: "10px",
          height: "10px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#535353",
          borderRadius: "10px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#dbdbdb",
          borderRadius: "10px",
        },
      }}
    >
      {children}
    </List>
  );
};

export default ScrollList;

import { Box } from "@mui/material";

const ColumnFlexBox = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="Column"
      alignItems="center"
      sx={{ width: "100vw" }}
    >
      {children}
    </Box>
  );
};

export default ColumnFlexBox;

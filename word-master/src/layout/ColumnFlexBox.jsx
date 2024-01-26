import { Box } from "@mui/material";

const ColumnFlexBox = ({ children }) => {
  return (
    <Box
      display="flex"
      flexDirection="Column"
      alignItems="center"
      justifyContent="center"
      sx={{ width: "100%", height: "100%" }}
    >
      {children}
    </Box>
  );
};

export default ColumnFlexBox;

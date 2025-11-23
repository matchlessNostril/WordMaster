import { Stack } from "@mui/material";

const RowSpaceBetween = ({ children }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      mb={1}
      sx={{
        width: "100%",
      }}
    >
      {children}
    </Stack>
  );
};

export default RowSpaceBetween;

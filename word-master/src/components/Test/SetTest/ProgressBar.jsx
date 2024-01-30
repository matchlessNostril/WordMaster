// MUI
import { Stack, Box, Typography, Slider, IconButton } from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";

const ProgressBar = ({ title, type, numOfPassed = 10, listLength }) => {
  // Slider 정보
  const percentage = Math.floor((numOfPassed / listLength) * 100);
  const marks = [
    {
      value: percentage,
      label: numOfPassed.toString(),
    },
    {
      value: 100,
      label: listLength.toString(),
    },
  ];

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        width: "100%",
        height: "70px",
      }}
    >
      <Box sx={{ mr: 2 }}>
        <Typography variant="body2" style={{ whiteSpace: "pre-line" }}>
          {`${type}\n(${percentage}%)`}
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <Slider
          defaultValue={percentage}
          marks={marks}
          disabled
          sx={{ "&.Mui-disabled": { color: "#535353" } }}
        />
      </Box>
      <IconButton sx={{ ml: 2 }}>
        <RestartAltIcon />
      </IconButton>
    </Stack>
  );
};

export default ProgressBar;

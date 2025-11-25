import React from "react";
import { ListItem, Button, useTheme, alpha } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddBtn = React.memo(({ handleClick }) => {
  const theme = useTheme();

  return (
    <ListItem sx={{ display: "flex", justifyContent: "center", my: 3 }}>
      <Button
        onClick={handleClick}
        disableTouchRipple
        fullWidth
        startIcon={<AddIcon />}
        sx={{
          py: 2,
          borderRadius: "12px",
          backgroundImage: `linear-gradient(to right, ${alpha(
            theme.palette.slate[700],
            0.5
          )}, ${alpha(theme.palette.slate[700], 0.3)})`,
          border: `2px dashed ${theme.palette.slate[600]}`,
          color: theme.palette.textColors.slate400,
          fontWeight: 500,
          textTransform: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: theme.palette.cyan[500],
            backgroundImage: `linear-gradient(to right, ${alpha(
              theme.palette.cyan[500],
              0.1
            )}, ${alpha(theme.palette.blue[500], 0.1)})`,
            color: theme.palette.cyan[400],
            "& .MuiButton-startIcon": {
              transform: "rotate(90deg)",
            },
          },
          "&:active": {
            transform: "scale(0.98)",
          },
          "& .MuiButton-startIcon": {
            margin: 0,
            transition: "transform 0.3s ease",
          },
        }}
      >
        カードを追加
      </Button>
    </ListItem>
  );
});

export default AddBtn;

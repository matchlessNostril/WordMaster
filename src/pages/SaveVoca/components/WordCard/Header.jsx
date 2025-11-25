import React from "react";
import {
  Grid,
  Typography,
  IconButton,
  Box,
  useTheme,
  alpha,
} from "@mui/material";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";

const Header = React.memo(({ index, handleRemove }) => {
  const theme = useTheme();

  return (
    <Grid item xs={12} sx={{ marginBottom: "16px" }}>
      <Grid container columns={{ xs: 16, sm: 12 }}>
        <Grid item xs={14} sm={10}>
          <Box
            sx={{
              minWidth: "40px",
              minHeight: "40px",
              width: "fit-content",
              borderRadius: "8px",
              backgroundColor: theme.palette.slate[700],
              border: `1px solid ${theme.palette.slate[600]}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: theme.palette.textColors.slate300,
              fontWeight: "bold",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {index + 1}
            </Typography>
          </Box>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton
            onClick={() => handleRemove(index)}
            sx={{
              padding: "8px",
              borderRadius: "8px",
              color: theme.palette.textColors.slate400,
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: alpha(theme.palette.red[500], 0.1),
                color: theme.palette.red[400],
              },
            }}
          >
            <DeleteSharpIcon sx={{ width: "20px", height: "20px" }} />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default Header;

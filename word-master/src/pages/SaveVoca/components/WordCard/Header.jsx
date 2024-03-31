import React from "react";
import { Grid, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const Header = React.memo(({ index, handleRemove }) => {
  return (
    <Grid item xs={12}>
      <Grid container columns={{ xs: 16, sm: 12 }}>
        <Grid item xs={14} sm={10}>
          <Typography variant="h6">{index + 1}</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          sm={2}
          sx={{ display: "flex", justifyContent: "flex-end" }}
        >
          <IconButton
            onClick={() => handleRemove(index)}
            sx={{ padding: 0, paddingLeft: "3px" }}
          >
            <DeleteIcon />
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default Header;

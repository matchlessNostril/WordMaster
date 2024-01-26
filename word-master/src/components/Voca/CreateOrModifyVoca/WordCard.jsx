// Hook
import { useState } from "react";
// MUI
import { useTheme } from "@mui/material/styles";
import {
  ListItem,
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  IconButton,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import DeleteIcon from "@mui/icons-material/Delete";

const CardTextField = ({ label }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <TextField label={label} variant="standard" sx={{ width: "95%" }} />
    </Box>
  );
};

const WordCard = ({ index }) => {
  // theme
  const theme = useTheme();

  const [checked, setChecked] = useState(false);

  return (
    <ListItem>
      <Card variant="outlined" sx={{ display: "flex", width: "83vw" }}>
        <CardContent sx={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={12}>
              <Grid container columns={{ xs: 16, sm: 12 }}>
                <Grid item xs={14} sm={10}>
                  <Typography variant="h6">{index}</Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sm={2}
                  sx={{ display: "flex", justifyContent: "flex-end" }}
                >
                  <IconButton sx={{ padding: 0 }}>
                    <DragHandleIcon />
                  </IconButton>
                  <IconButton sx={{ padding: 0, paddingLeft: "3px" }}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={1}>
                <Grid item xs={12} sm={6}>
                  <CardTextField label="단어" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CardTextField label="뜻" />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox onChange={() => setChecked((prev) => !prev)} />
                    }
                    label="발음 추가"
                    sx={{ m: 0, mt: 1 }}
                  />
                </Grid>
                {checked && (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      [theme.breakpoints.down("sm")]: {
                        mt: -1.2,
                      },
                    }}
                  >
                    <CardTextField label="발음" />
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default WordCard;

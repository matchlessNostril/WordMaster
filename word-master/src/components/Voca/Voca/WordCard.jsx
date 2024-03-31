import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  ListItem,
  Card,
  CardContent,
  Grid,
  Box,
  TextField,
  IconButton,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const fullHeightStyle = {
  height: "100%",
};

const flexStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const MultilineTextField = ({ label, value }) => {
  return (
    <TextField
      label={label}
      variant="standard"
      value={value}
      multiline
      InputProps={{
        readOnly: true,
      }}
      sx={{ width: "90%" }}
    />
  );
};

const WordCard = ({ index, word, sortingBy, onHideAnswer }) => {
  // theme
  const theme = useTheme();

  // 발음이 있는지
  const hasPronunciation = word.hasOwnProperty("pronunciation");

  // 답 숨기기 State
  const [visible, setVisible] = useState(false);

  return (
    <ListItem>
      <Card variant="outlined" sx={{ display: "flex", width: "83vw" }}>
        <CardContent
          sx={{
            width: "100%",
            padding: 0,
            "&.MuiCardContent-root:last-child": { p: 0 },
          }}
        >
          <Grid
            container
            alignItems="center"
            wrap="nowrap"
            sx={{ height: "100%" }}
          >
            <Grid
              item
              xs={2}
              sx={{
                ...fullHeightStyle,
                ...flexStyle,
                borderRight: "1px solid #dbdbdb",
              }}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: 15,
                  backgroundColor: "#535353",
                  color: "white",
                  ...flexStyle,
                }}
              >
                <span
                  style={{
                    fontSize: index >= 100 ? "12px" : "16px",
                    paddingBottom: "1px",
                  }}
                >
                  {index + 1}
                </span>
              </Box>
            </Grid>
            <Grid item xs sx={fullHeightStyle}>
              <Grid container alignItems="center" sx={fullHeightStyle}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  sx={{
                    [theme.breakpoints.down("sm")]: {
                      borderBottom: "1px solid #dbdbdb",
                    },
                    [theme.breakpoints.up("sm")]: {
                      ...fullHeightStyle,
                      borderRight: "1px solid #dbdbdb",
                    },
                    ...flexStyle,
                    pt: 2,
                    pb: 2,
                  }}
                >
                  <MultilineTextField
                    label={sortingBy === "word" ? "단어" : "뜻"}
                    value={sortingBy === "word" ? word.word : word.mean}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid
                    container
                    sx={{
                      display: onHideAnswer && !visible ? "none" : "block",
                    }}
                  >
                    <Grid
                      item
                      xs={12}
                      sx={{
                        ...flexStyle,
                        pt: 2,
                        pb: hasPronunciation ? 1 : 2,
                      }}
                    >
                      <MultilineTextField
                        label={sortingBy === "word" ? "뜻" : "단어"}
                        value={sortingBy === "word" ? word.mean : word.word}
                      />
                    </Grid>
                    {hasPronunciation && (
                      <Grid
                        item
                        xs={12}
                        sx={{
                          ...flexStyle,
                          pt: hasPronunciation ? 1 : 2,
                          pb: 2,
                        }}
                      >
                        <MultilineTextField
                          label="발음"
                          value={word.pronunciation}
                        />
                      </Grid>
                    )}
                  </Grid>
                  {onHideAnswer && (
                    <Grid container>
                      <Grid item xs={12} sx={{ ...flexStyle, p: 2 }}>
                        <IconButton onClick={() => setVisible((prev) => !prev)}>
                          {visible ? (
                            <KeyboardArrowUpIcon />
                          ) : (
                            <KeyboardArrowDownIcon />
                          )}
                        </IconButton>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ListItem>
  );
};

export default WordCard;

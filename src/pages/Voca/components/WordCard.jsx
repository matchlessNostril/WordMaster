import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { ListItem, Card, CardContent, Grid, IconButton } from "@mui/material";
import { fullHeightStyle, flexStyle } from "./WordCard/constants";
import { NumberCircle, MultilineTextField } from "./WordCard/index";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const WordCard = ({ index, word, sortingBy, onHideAnswer }) => {
  const theme = useTheme();
  const hasPronunciation = word.hasOwnProperty("pronunciation");
  const [visibleAnswer, setVisibleAnswer] = useState(false);

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
            <NumberCircle index={index} />
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
                    label={sortingBy === "word" ? "単語" : "意味"}
                    value={sortingBy === "word" ? word.word : word.mean}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Grid
                    container
                    sx={{
                      display:
                        onHideAnswer && !visibleAnswer ? "none" : "block",
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
                        label={sortingBy === "word" ? "意味" : "単語"}
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
                          label="発音"
                          value={word.pronunciation}
                        />
                      </Grid>
                    )}
                  </Grid>
                  {onHideAnswer && (
                    <Grid container>
                      <Grid item xs={12} sx={{ ...flexStyle, p: 2 }}>
                        <IconButton
                          onClick={() => setVisibleAnswer((prev) => !prev)}
                        >
                          {visibleAnswer ? (
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

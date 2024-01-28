import React from "react";
// Hook
import { useState, useCallback } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";
// Utils
import { isEqual } from "lodash";

const WordCard = ({ index, word, wordListDispatch, focus }) => {
  // theme
  const theme = useTheme();

  // TextField 입력 핸들러 함수
  const onInputTextField = useCallback((event, propName) => {
    wordListDispatch({
      type: "UPDATE_PROP",
      index: index,
      propName: propName,
      value: event.target.value,
    });
  }, []);

  // 체크박스 체크 State
  const [checked, setChecked] = useState(
    word.hasOwnProperty("pronunciation") ? true : false
  );
  // 체크박스 체크 핸들러 함수
  const onClickCheckbox = useCallback(() => {
    setChecked((prev) => !prev);
    wordListDispatch({
      type: "CLICK_CHECKBOX",
      index: index,
    });
  }, []);

  return (
    <ListItem>
      <Card variant="outlined" sx={{ display: "flex", width: "83vw" }}>
        <CardContent sx={{ width: "100%" }}>
          <Grid container>
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
                    onClick={() =>
                      wordListDispatch({ type: "DELETE_WORD", index: index })
                    }
                    sx={{ padding: 0, paddingLeft: "3px" }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container rowSpacing={1}>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      label="단어"
                      variant="standard"
                      multiline
                      autoComplete="off"
                      autoFocus={focus}
                      value={word.word}
                      onChange={(event) => onInputTextField(event, "word")}
                      sx={{ width: "95%" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <TextField
                      label="뜻"
                      variant="standard"
                      multiline
                      autoComplete="off"
                      value={word.mean}
                      onChange={(event) => onInputTextField(event, "mean")}
                      sx={{ width: "95%" }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={checked} onChange={onClickCheckbox} />
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
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <TextField
                        label="발음"
                        variant="standard"
                        multiline
                        autoComplete="off"
                        value={word?.pronunciation}
                        onChange={(event) =>
                          onInputTextField(event, "pronunciation")
                        }
                        sx={{ width: "95%" }}
                      />
                    </Box>
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

// 부모 컴포넌트인 CreateVoca에서 단어 목록을 wordList State로 관리하고
// wordList를 map을 사용해 각 value를 word props 값으로 전달하고 있음
// 따라서 이 WordCard 컴포넌트에서 word 값이 바뀌면 wordList도 바뀌게 되고,
// word 값이 바뀌지 않은 다른 WordCard 컴포넌트도 불필요하게 리랜더링 되게 됨
// 따라서 word props 값이 이전과 같다면 리랜더링 되지 않도록 propsAreEqual 함수 사용

const propsAreEqual = (prevProps, nextProps) => {
  return isEqual(prevProps.word, nextProps.word);
};

export default React.memo(WordCard, propsAreEqual);

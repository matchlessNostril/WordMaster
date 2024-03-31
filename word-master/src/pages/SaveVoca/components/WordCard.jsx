import React, { useState, useCallback } from "react";
import { useTheme } from "@mui/material/styles";
import { ListItem, Card, CardContent, Grid } from "@mui/material";
import { Header, InputField, PronunciationCheckbox } from "./WordCard/index";
import { isEqual } from "lodash";

const WordCard = ({ index, word, wordListDispatch, autoFocus }) => {
  const theme = useTheme();

  const [isChecked, setIsChecked] = useState(
    word.hasOwnProperty("pronunciation") ? true : false
  );

  const handleRemove = useCallback((index) => {
    wordListDispatch({ type: "REMOVE", index });
  }, []);

  const handleInput = useCallback((event, propName) => {
    wordListDispatch({
      type: "UPDATE",
      index,
      propName,
      value: event.target.value,
    });
  }, []);

  const handleCheck = useCallback(() => {
    setIsChecked((prev) => !prev);
    wordListDispatch({
      type: "CHECK",
      index,
    });
  }, []);

  return (
    <ListItem>
      <Card variant="outlined" sx={{ display: "flex", width: "83vw" }}>
        <CardContent sx={{ width: "100%" }}>
          <Grid container>
            <Header {...{ index, handleRemove }} />
            <Grid item xs={12}>
              <Grid container rowSpacing={1}>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="단어"
                    value={word.word}
                    autoFocus={autoFocus}
                    type="word"
                    handleInput={handleInput}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="뜻"
                    value={word.mean}
                    type="mean"
                    handleInput={handleInput}
                  />
                </Grid>
                <PronunciationCheckbox {...{ isChecked, handleCheck }} />
                {isChecked && (
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
                    <InputField
                      label="발음"
                      value={word?.pronunciation}
                      type="pronunciation"
                      handleInput={handleInput}
                    />
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

// 부모 컴포넌트에서 단어 목록을 wordList State로 관리하고
// wordList를 map을 사용해 각 value를 word props 값으로 전달하고 있음
// 따라서 이 WordCard 컴포넌트에서 word 값이 바뀌면 wordList도 바뀌게 되고,
// word 값이 바뀌지 않은 다른 WordCard 컴포넌트도 불필요하게 리랜더링 되게 됨
// 따라서 word props 값이 이전과 같다면 리랜더링 되지 않도록 propsAreEqual 함수 사용

const propsAreEqual = (prevProps, nextProps) => {
  return isEqual(prevProps.word, nextProps.word);
};

export default React.memo(WordCard, propsAreEqual);

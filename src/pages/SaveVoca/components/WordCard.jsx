import React, { useState, useCallback } from "react";
import { ListItem, Card, CardContent, Grid } from "@mui/material";
import { Header, InputField, TextFieldWithCheckbox } from "./WordCard/index";
import { isEqual } from "lodash";

const WordCard = ({ index, word, wordListDispatch, autoFocus }) => {
  const [checkList, setCheckList] = useState({
    pronunciation: word.hasOwnProperty("pronunciation") ? true : false,
    explain: word.hasOwnProperty("explain") ? true : false,
    example: word.hasOwnProperty("example") ? true : false,
  });

  const handleRemove = useCallback(
    (index) => {
      wordListDispatch({ type: "REMOVE", index });
    },
    [wordListDispatch]
  );

  const handleInput = useCallback(
    (event, propName) => {
      wordListDispatch({
        type: "UPDATE",
        index,
        propName,
        value: event.target.value,
      });
    },
    [index, wordListDispatch]
  );

  const handleCheck = useCallback(
    (propName) => {
      setCheckList((prev) => ({
        ...prev,
        [propName]: !prev[propName],
      }));
      wordListDispatch({
        type: "CHECK",
        index,
        propName,
      });
    },
    [index, wordListDispatch]
  );

  return (
    <ListItem>
      <Card variant="outlined" sx={{ display: "flex", width: "83vw" }}>
        <CardContent sx={{ width: "100%" }}>
          <Grid container>
            <Header {...{ index, handleRemove }} />
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="単語"
                    value={word.word}
                    autoFocus={autoFocus}
                    type="word"
                    handleInput={handleInput}
                  />
                  <TextFieldWithCheckbox
                    checked={checkList.pronunciation}
                    label="発音"
                    type="pronunciation"
                    value={word.pronunciation}
                    handleCheck={() => handleCheck("pronunciation")}
                    handleInput={handleInput}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <InputField
                    label="意味"
                    value={word.mean}
                    type="mean"
                    handleInput={handleInput}
                  />
                  {[
                    { propName: "explain", label: "説明" },
                    { propName: "example", label: "例文" },
                  ].map(({ propName, label }) => (
                    <TextFieldWithCheckbox
                      key={propName}
                      checked={checkList[propName]}
                      label={label}
                      type={propName}
                      value={word[propName]}
                      handleCheck={() => handleCheck(propName)}
                      handleInput={handleInput}
                    />
                  ))}
                </Grid>
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

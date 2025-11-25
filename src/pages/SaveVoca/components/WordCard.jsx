import React, { useState, useCallback } from "react";
import {
  ListItem,
  Card,
  CardContent,
  Grid,
  useTheme,
  alpha,
} from "@mui/material";
import { Header, WordCardForm } from "./WordCard/index";
import { isEqual } from "lodash";
import { ChipButton } from "../../../components";

const WordCard = ({ index, word, wordListDispatch, autoFocus }) => {
  const theme = useTheme();

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
    <ListItem sx={{ padding: "0", marginBottom: "16px" }}>
      <Card
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: "transparent",
          backgroundImage: `linear-gradient(to bottom right, ${
            theme.palette.slate[800]
          }, ${alpha(theme.palette.slate[800], 0.7)})`,
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          borderRadius: "12px",
          border: `1px solid ${alpha(theme.palette.slate[700], 0.5)}`,
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          padding: "24px",
          transition: "all 0.3s ease",
          "&:hover": {
            borderColor: alpha(theme.palette.cyan[500], 0.3),
          },
        }}
      >
        <CardContent
          sx={{
            width: "100%",
            padding: 0,
            "&.MuiCardContent-root:last-child": {
              paddingBottom: 0,
            },
          }}
        >
          <Grid container>
            <Header {...{ index, handleRemove }} />
            <WordCardForm {...{ word, checkList, autoFocus, handleInput }} />
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
              }}
            >
              {[
                {
                  propName: "pronunciation",
                  text: "発音",
                },
                {
                  propName: "explain",
                  text: "説明",
                },
                {
                  propName: "example",
                  text: "例文",
                },
              ].map(({ propName, text }, index) => (
                <ChipButton
                  key={propName + index}
                  text={text}
                  selected={checkList[propName]}
                  onClick={() => handleCheck(propName)}
                />
              ))}
            </div>
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

import ReactCardFlip from "react-card-flip";
import React, { useState, useEffect } from "react";
import {
  useMediaQuery,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";

// QuestionCard의 question prop의 값이 바뀌어 TextCard의 children prop의 값이 바뀌지 않는 이상,
// QuestionCard의 isFlipped State로 인해 리렌더링 되지 않도록 children 얕은 비교로 메모이제이션
const TextCard = React.memo(
  ({ setIsFlipped, isFront = false, children }) => {
    // MediaQuery
    const isPortrait = useMediaQuery("(orientation: portrait)");

    const [showAnswer, setShowAnswer] = useState(true);
    useEffect(() => {
      if (isFront) return;

      setShowAnswer(false);
      setTimeout(() => setShowAnswer(true), 600);
    }, [children]);

    return (
      <Card
        sx={{
          flexGrow: 1,
          mt: 2,
          backgroundColor: isFront ? "#535353" : "#dbdbdb",
        }}
      >
        <CardActionArea
          onClick={() => setIsFlipped((prev) => !prev)}
          sx={{ height: isPortrait ? "30vh" : "40vh" }}
        >
          <CardContent sx={{ p: 0, width: "100%", textAlign: "center" }}>
            {showAnswer && (
              <strong
                style={{
                  color: isFront ? "white" : "#535353",
                  fontSize: "20px",
                  fontWeight: "initial",
                  whiteSpace: "pre-line",
                }}
              >
                {children}
              </strong>
            )}
            {isFront && (
              <TouchAppIcon
                sx={{
                  position: "absolute",
                  bottom: 10,
                  right: 10,
                  color: "#3c3c3c",
                }}
              />
            )}
          </CardContent>
        </CardActionArea>
      </Card>
    );
  },
  (prevProps, nextProps) => prevProps.children === nextProps.children
);

const QuestionCard = ({ type, questionWord }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [questionWord]);

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
      <TextCard {...{ setIsFlipped }} isFront>
        {type === "word" ? questionWord.word : questionWord.mean}
      </TextCard>
      <TextCard {...{ setIsFlipped }}>
        {type === "word" ? questionWord.mean : questionWord.word}
        {questionWord.hasOwnProperty("pronunciation") &&
          `\n\n${questionWord.pronunciation}`}
      </TextCard>
    </ReactCardFlip>
  );
};

export default React.memo(
  QuestionCard,
  (prevProps, nextProps) => prevProps.questionWord === nextProps.questionWord
);

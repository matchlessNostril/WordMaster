import ReactCardFlip from "react-card-flip";
import React, { useState, useEffect } from "react";
import {
  useMediaQuery,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";

const QuestionCard = ({ type, questionWord }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    setIsFlipped(false);
  }, [questionWord]);

  return (
    <ReactCardFlip
      isFlipped={isFlipped}
      flipSpeedBackToFront={0.01}
      flipDirection="vertical">
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

export default QuestionCard;

const TextCard = ({ setIsFlipped, isFront = false, children }) => {
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <Card
      sx={{
        flexGrow: 1,
        mt: 2,
        backgroundColor: isFront ? "#535353" : "#dbdbdb",
      }}>
      <CardActionArea
        onClick={() => setIsFlipped((prev) => !prev)}
        sx={{ height: isPortrait ? "30vh" : "40vh" }}>
        <CardContent sx={{ p: 0, width: "100%", textAlign: "center" }}>
          <strong
            style={{
              color: isFront ? "white" : "#535353",
              fontSize: "20px",
              fontWeight: "initial",
              whiteSpace: "pre-line",
            }}>
            {children}
          </strong>
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
};

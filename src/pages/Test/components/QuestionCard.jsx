import React from "react";
import {
  useMediaQuery,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Fade,
} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import AnswerTable from "./AnswerTable";
import PopOverBtn from "./PopOverBtn";

const QuestionCard = ({
  type,
  showAnswer,
  setShowAnswer,
  question,
  questionDispatch,
  setCurrentListLength,
}) => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const questionWord = question.word;

  return (
    <Card
      sx={{
        flexGrow: 1,
        mt: 2,
        position: "relative",
        backgroundColor: showAnswer ? "#dbdbdb" : "#535353",
      }}
    >
      <CardActionArea
        onClick={() => setShowAnswer((prev) => !prev)}
        sx={{ height: isPortrait ? "45vh" : "40vh" }}
      >
        <CardContent
          sx={{
            p: 0,
            width: "100%",
            textAlign: showAnswer ? "left" : "center",
            height: "100%",
          }}
        >
          {questionWord && (
            <>
              {showAnswer ? (
                <AnswerTable type={type} questionWord={questionWord} />
              ) : (
                <Fade
                  in
                  timeout={1000}
                  key={`${questionWord.word}-${questionWord.mean}-${showAnswer}`}
                >
                  <Box
                    sx={{
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <strong
                      style={{
                        color: "white",
                        fontSize: "26px",
                        fontWeight: "initial",
                        whiteSpace: "pre-line",
                        display: "inline-block",
                      }}
                    >
                      {type === "word" ? questionWord.word : questionWord.mean}
                    </strong>
                  </Box>
                </Fade>
              )}
            </>
          )}

          {!showAnswer && (
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
      <PopOverBtn
        question={question}
        questionDispatch={questionDispatch}
        setCurrentListLength={setCurrentListLength}
      />
    </Card>
  );
};

export default QuestionCard;

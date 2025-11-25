import React from "react";
import {
  useMediaQuery,
  Card,
  CardActionArea,
  CardContent,
  Box,
  Fade,
  useTheme,
  Typography,
  alpha,
} from "@mui/material";
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
  const theme = useTheme();
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const questionWord = question.word;

  return (
    <Card
      sx={{
        flexGrow: 1,
        mt: 2,
        position: "relative",
        width: "100%",
        backgroundImage: `linear-gradient(to bottom right, ${theme.palette.slate[800]}, ${theme.palette.slate[900]})`,
        border: `2px solid ${theme.palette.slate[600]}`,
        borderRadius: "16px",
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
        overflowY: "scroll",
        boxSizing: "border-box",
        "&::-webkit-scrollbar": {
          width: "6px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(theme.palette.slate[500], 0.5),
          borderRadius: "3px",
        },
      }}
    >
      <CardActionArea
        onClick={() => setShowAnswer((prev) => !prev)}
        sx={{
          minHeight: isPortrait ? "45vh" : "55vh",
          height: "fit-content",
          maxHeight: isPortrait ? "55vh" : "65vh",
        }}
      >
        <CardContent
          sx={{
            p: 0,
            pl: showAnswer ? 0.5 : 0,
            width: "100%",
            textAlign: showAnswer ? "left" : "center",
            height: "100%",
            overflow: showAnswer ? "hidden" : "visible",
            display: "flex",
            flexDirection: "column",
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
                        color: theme.palette.textColors.slate100,
                        fontSize: "2rem",
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
            <Box
              sx={{
                position: "absolute",
                bottom: "16px",
                right: "24px",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: theme.palette.slate[500],
                }}
              >
                タップ
              </Typography>
            </Box>
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

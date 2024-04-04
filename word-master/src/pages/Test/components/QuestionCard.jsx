import {
  useMediaQuery,
  Card,
  CardActionArea,
  CardContent,
} from "@mui/material";
import TouchAppIcon from "@mui/icons-material/TouchApp";

const QuestionCard = ({ type, showAnswer, setShowAnswer, questionWord }) => {
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <Card
      sx={{
        flexGrow: 1,
        mt: 2,
        backgroundColor: showAnswer ? "#dbdbdb" : "#535353",
      }}>
      <CardActionArea
        onClick={() => setShowAnswer((prev) => !prev)}
        sx={{ height: isPortrait ? "30vh" : "40vh" }}>
        <CardContent sx={{ p: 0, width: "100%", textAlign: "center" }}>
          <strong
            style={{
              color: showAnswer ? "#535353" : "white",
              fontSize: "20px",
              fontWeight: "initial",
              whiteSpace: "pre-line",
            }}>
            {showAnswer ? (
              <>
                {type === "word" ? questionWord.mean : questionWord.word}
                {questionWord.hasOwnProperty("pronunciation") &&
                  `\n\n${questionWord.pronunciation}`}
              </>
            ) : (
              <>{type === "word" ? questionWord.word : questionWord.mean}</>
            )}
          </strong>
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
    </Card>
  );
};

export default QuestionCard;

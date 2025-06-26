import { useNavigate } from "react-router-dom";
import {
  useMediaQuery,
  Stack,
  Card,
  CardActionArea,
  CardMedia,
} from "@mui/material";
import { Transition } from "../components";

const cardList = [
  {
    img: "vocaLogo.png",
    description:
      "フォルダを作成して、好きな場所に単語帳を作成できます。\n自分だけの体系的な単語帳サイトを作ってみましょう！",
    to: "/VocaList?path=root",
  },
  {
    img: "testLogo.png",
    description: `テストを作成して、選んだ単語帳で、好きな設定でテストを受けてみましょう。\n間違った単語は、正解するまで続けましょう！`,
    to: "/TestList",
  },
];

const Main = () => {
  const navigate = useNavigate();
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <Stack
      direction={isPortrait ? "column" : "row"}
      spacing={isPortrait ? 4 : 30}
    >
      {cardList.map((card, index) => (
        <Card
          key={index}
          sx={{
            maxWidth: 550,
            width: isPortrait ? "40vh" : "30vw",
            boxShadow: "0px 0px 5px 5px rgb(224, 224, 224)",
            "&:hover": {
              boxShadow: "0px 0px 8px 8px #d2d2d2",
            },
          }}
        >
          <CardActionArea onClick={() => navigate(card.to)}>
            <CardMedia
              component="img"
              src={require(`../assets/images/${card.img}`)}
              alt={card.title}
              aria-description={card.description}
            />
          </CardActionArea>
        </Card>
      ))}
    </Stack>
  );
};

export default Transition(Main);

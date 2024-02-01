import { useNavigate } from "react-router-dom";
import { useIsPortrait } from "../hooks";
import { Stack, Card, CardActionArea, CardMedia } from "@mui/material";
import Transition from "../components/Transition";

const Main = () => {
  const navigate = useNavigate();
  const isPortrait = useIsPortrait();

  const cardList = [
    {
      img: "vocaLogo.png",
      description:
        "폴더를 생성해서 원하는 위치에 단어장을 만들 수 있어요.\n여러분 만의 체계적인 단어장 사이트를 만들어 보세요!",
      to: "/VocaList?path=root",
    },
    {
      img: "testLogo.png",
      description: `테스트 치를 단어장을 선택하고, 원하는 설정대로 테스트를 치뤄 보세요.\n틀린 단어는 맞힐 때까지 계속!`,
      to: "/TestList",
    },
  ];

  return (
    <>
      <Stack
        direction={isPortrait ? "column" : "row"}
        spacing={isPortrait ? 4 : 30}
      >
        {cardList.map((card) => (
          <Card
            key={card.title}
            sx={{
              maxWidth: 550,
              width: isPortrait ? "80vw" : "30vw",
              "&:hover": {
                boxShadow: "0px 0px 5px 5px #d2d2d2",
              },
            }}
          >
            <CardActionArea onClick={() => navigate(card.to)}>
              <CardMedia
                component="img"
                src={require(`../assets/images/${card.img}`)}
                alt={card.title}
              ></CardMedia>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Transition(Main);

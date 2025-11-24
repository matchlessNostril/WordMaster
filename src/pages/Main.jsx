import { useNavigate } from "react-router-dom";
import {
  useMediaQuery,
  Stack,
  Card,
  CardActionArea,
  Box,
  Typography,
  useTheme,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import QuizIcon from "@mui/icons-material/Quiz";
import { Transition } from "../components";

const cardList = [
  {
    title: "VOCA",
    icon: FolderIcon,
    description: [
      "フォルダを作り、好きな場所に単語帳を作成できます。",
      "体系的に単語帳を管理しましょう。",
      "単語帳を作成する  ＞",
    ],
    gradientFrom: "cyan",
    gradientTo: "blue",
    hoverBorder: "cyan",
    to: "/VocaList?path=root",
  },
  {
    title: "TEST",
    icon: QuizIcon,
    description: [
      "テストしたい単語帳を選んで、テストを受けてみましょう。",
      "間違えた単語は、正解するまで繰り返し出題されます。",
      "テストを始める  ＞",
    ],
    gradientFrom: "blue",
    gradientTo: "purple",
    hoverBorder: "blue",
    to: "/TestList",
  },
];

const Main = () => {
  const navigate = useNavigate();
  const isPortrait = useMediaQuery("(orientation: portrait)");
  const theme = useTheme();

  const getGradientColor = (fromColor, toColor) => {
    const from = theme.palette[fromColor]?.[500] || theme.palette.cyan[500];
    const to = theme.palette[toColor]?.[500] || theme.palette.blue[500];
    return { from, to };
  };

  const getHoverBorderColor = (color) => {
    const colorValue = theme.palette[color]?.[400] || theme.palette.cyan[400];
    return `${colorValue}80`; // 50% opacity
  };

  const getTextColor = (color) => {
    return theme.palette[color]?.[400] || theme.palette.cyan[400];
  };

  return (
    <Stack
      direction={isPortrait ? "column" : "row"}
      spacing={isPortrait ? 4 : 20}
    >
      {cardList.map((card, index) => {
        const IconComponent = card.icon;
        const gradient = getGradientColor(card.gradientFrom, card.gradientTo);
        const hoverBorder = getHoverBorderColor(card.hoverBorder);
        const textColor = getTextColor(card.hoverBorder);

        return (
          <Card
            key={index}
            sx={{
              maxWidth: 550,
              width: isPortrait ? 300 : "30vw",
              background: `${theme.palette.slate[800]}80`,
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              borderRadius: "24px",
              border: `1px solid ${theme.palette.slate[700]}80`,
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              padding: isPortrait ? "26px" : "32px",
              transition: "all 0.3s",
              "&:hover": {
                borderColor: hoverBorder,
                transform: "scale(1.02)",
              },
            }}
          >
            <CardActionArea
              onClick={() => navigate(card.to)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                padding: 0,
              }}
            >
              {/* Icon Container */}
              <Box
                sx={{
                  position: "relative",
                  marginBottom: "24px",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: `linear-gradient(to bottom right, ${gradient.from}33, ${gradient.to}33)`,
                    borderRadius: "16px",
                    filter: "blur(32px)",
                    transition: "all 0.3s",
                  }}
                />
                <Box
                  sx={{
                    position: "relative",
                    background: `linear-gradient(to bottom right, ${gradient.from}, ${gradient.to})`,
                    borderRadius: "16px",
                    paddingX: isPortrait ? "16px" : "24px",
                    paddingY: isPortrait ? "8px" : "16px",
                    boxShadow: `0 10px 15px -3px ${gradient.from}50`,
                  }}
                >
                  <IconComponent
                    sx={{
                      width: isPortrait ? "48px" : "64px",
                      height: isPortrait ? "48px" : "64px",
                      color: "white",
                    }}
                  />
                </Box>
              </Box>

              {/* Title */}
              <Typography
                variant="h2"
                sx={{
                  fontSize: "2rem",
                  fontWeight: 900,
                  color: theme.palette.textColors.slate100,
                  marginBottom: "16px",
                  letterSpacing: "-0.025em",
                }}
              >
                {card.title}
              </Typography>

              {/* Description */}
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                {card.description.map((line, lineIndex) => (
                  <Typography
                    key={lineIndex}
                    sx={{
                      fontSize: "1rem",
                      lineHeight: 1.75,
                      color:
                        lineIndex === card.description.length - 1
                          ? textColor
                          : theme.palette.textColors.slate300,
                      fontWeight:
                        lineIndex === card.description.length - 1 ? 600 : 400,
                    }}
                  >
                    {line}
                  </Typography>
                ))}
              </Box>
            </CardActionArea>
          </Card>
        );
      })}
    </Stack>
  );
};

export default Transition(Main);

import { usePopOver } from "../hooks";
import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  IconButton,
  useTheme,
  alpha,
} from "@mui/material";
import { BtnPopover } from ".";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const StyledListItemCard = ({
  onClickCard,
  iconComponent,
  title,
  popoverBtns,
}) => {
  const theme = useTheme();
  const [popoverAnchor, setPopoverAnchor, handleClickPopoverBtn] = usePopOver();

  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: alpha(theme.palette.slate[800], 0.5),
        borderRadius: "16px",
        border: `1px solid ${alpha(theme.palette.slate[700], 0.5)}`,
        boxShadow: "0 20px 35px -20px rgba(0,0,0,0.8)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        transition: "border-color 0.2s ease, transform 0.2s ease",
        "&:hover": {
          borderColor: alpha(theme.palette.slate[600], 0.7),
          transform: "translateY(-1px)",
        },
      }}
    >
      <CardActionArea
        onClick={onClickCard}
        sx={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          gap: "16px",
          padding: "18px 24px",
        }}
      >
        {iconComponent}
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            fontWeight: 500,
            color: theme.palette.textColors.slate200,
            fontSize: "1rem",
          }}
        >
          {title}
        </Typography>
      </CardActionArea>
      <CardActions
        sx={{
          paddingRight: "16px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <IconButton
          onClick={handleClickPopoverBtn}
          sx={{
            padding: "8px",
            borderRadius: "10px",
            color: theme.palette.textColors.slate300,
            transition: "all 0.2s ease",
            "&:hover": {
              color: theme.palette.textColors.slate100,
              backgroundColor: alpha(theme.palette.slate[700], 0.4),
            },
          }}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
        <BtnPopover
          anchor={popoverAnchor}
          setAnchor={setPopoverAnchor}
          buttons={popoverBtns}
        />
      </CardActions>
    </Card>
  );
};

export default StyledListItemCard;

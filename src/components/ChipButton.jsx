import { Button, useTheme } from "@mui/material";

const ChipButton = ({ onClick, text, selected = false, ...props }) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      disableTouchRipple
      sx={{
        px: 1.25,
        py: 0.8,
        backgroundColor: selected ? "transparent" : theme.palette.slate[700],
        backgroundImage: selected
          ? `linear-gradient(to right, ${theme.palette.purple[500]}, ${theme.palette.purple[600]})`
          : "none",
        color: selected ? "white" : theme.palette.textColors.slate300,
        borderRadius: "24px",
        textTransform: "none",
        fontWeight: 500,
        fontSize: "0.8rem",
        transition: "all 0.3s ease",
        boxShadow: selected
          ? `0 10px 15px -3px ${theme.palette.purple[500]}33, 0 4px 6px -2px ${theme.palette.purple[500]}33`
          : "none",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: selected ? "transparent" : theme.palette.slate[600],
          backgroundImage: selected
            ? `linear-gradient(to right, ${theme.palette.purple[600]}, ${theme.palette.purple[700]})`
            : "none",
          boxShadow: selected
            ? `0 10px 15px -3px ${theme.palette.purple[500]}66, 0 4px 6px -2px ${theme.palette.purple[500]}66`
            : "none",
        },
        ...props.sx,
      }}
      {...props}
    >
      {text}
    </Button>
  );
};

export default ChipButton;

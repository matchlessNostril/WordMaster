import { Button, useTheme, CircularProgress } from "@mui/material";

const GradientButton = ({
  onClick,
  icon,
  text,
  fullWidth = false,
  disabled = false,
  isLoading = false,
  ...props
}) => {
  const theme = useTheme();

  return (
    <Button
      onClick={onClick}
      disableTouchRipple
      disabled={disabled || isLoading}
      startIcon={icon || undefined}
      fullWidth={fullWidth}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        px: 2,
        py: 1,
        backgroundImage:
          disabled || isLoading
            ? `linear-gradient(to right, ${theme.palette.slate[500]}, ${theme.palette.slate[500]})`
            : `linear-gradient(to right, ${theme.palette.cyan[500]}, ${theme.palette.blue[500]})`,
        color:
          disabled || isLoading ? theme.palette.textColors.slate400 : "white",
        borderRadius: "8px",
        textTransform: "none",
        fontWeight: 500,
        transition: "all 0.3s ease",
        boxShadow:
          disabled || isLoading
            ? "none"
            : `0 10px 15px -3px ${theme.palette.cyan[500]}33, 0 4px 6px -2px ${theme.palette.cyan[500]}33`,
        cursor: disabled || isLoading ? "not-allowed" : "pointer",
        opacity: disabled || isLoading ? 0.6 : 1,
        "&:hover": {
          backgroundImage:
            disabled || isLoading
              ? `linear-gradient(to right, ${theme.palette.slate[500]}, ${theme.palette.slate[500]})`
              : `linear-gradient(to right, ${theme.palette.cyan[600]}, ${theme.palette.blue[600]})`,
          boxShadow:
            disabled || isLoading
              ? "none"
              : `0 10px 15px -3px ${theme.palette.cyan[500]}66, 0 4px 6px -2px ${theme.palette.cyan[500]}66`,
        },
        "& .MuiButton-startIcon": {
          margin: 0,
        },
        ...props.sx,
      }}
      {...props}
    >
      {isLoading && (
        <CircularProgress size={16} sx={{ color: "white", mr: 1 }} />
      )}
      {text}
    </Button>
  );
};

export default GradientButton;

import { useMediaQuery } from "@mui/material";

const useIsPortrait = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");
  return isPortrait;
};

export default useIsPortrait;

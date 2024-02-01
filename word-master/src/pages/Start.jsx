import { useIsPortrait } from "../hooks";
import Transition from "../components/Transition";

const Start = () => {
  const isPortrait = useIsPortrait();

  return (
    <img
      src={require("../assets/images/slogan.png")}
      style={{ width: isPortrait ? "70vw" : "30vw" }}
    />
  );
};

export default Transition(Start);

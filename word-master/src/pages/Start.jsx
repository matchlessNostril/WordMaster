import { useIsPortrait } from "../hooks";
import { Transition, Loading } from "../components";

const Start = () => {
  const isWaitingAutoLogin = localStorage.getItem("autoLogin");
  const isPortrait = useIsPortrait();

  return (
    <>
      <img
        src={require("../assets/images/slogan.png")}
        style={{ width: isPortrait ? "70vw" : "30vw" }}
      />
      {isWaitingAutoLogin === "on" && <Loading onMarginTop={false} />}
    </>
  );
};

export default Transition(Start);

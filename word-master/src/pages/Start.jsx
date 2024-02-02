import { useIsPortrait } from "../hooks";
import { Transition, Loading } from "../components";

const Start = () => {
  const isLoginUser = localStorage.getItem("isLoginUser");
  const isPortrait = useIsPortrait();

  return (
    <>
      <img
        src={require("../assets/images/slogan.png")}
        style={{ width: isPortrait ? "70vw" : "30vw" }}
      />
      {isLoginUser === "yes" && <Loading onMarginTop={false} />}
    </>
  );
};

export default Transition(Start);

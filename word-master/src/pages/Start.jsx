import { useMediaQuery } from "@mui/material";
import { Transition, Loading } from "../components";

const Start = () => {
  // 자동 로그인 사용자인지 확인
  const isLoginUser = localStorage.getItem("isLoginUser");
  const isPortrait = useMediaQuery("(orientation: portrait)");

  return (
    <>
      <img
        src={require("../assets/images/slogan.png")}
        style={{ width: isPortrait ? "70vw" : "30vw" }}
        alt="Word Master 로고 이미지"
      />
      {isLoginUser === "yes" && <Loading onMarginTop={false} />}
    </>
  );
};

export default Transition(Start);

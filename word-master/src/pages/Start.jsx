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
        style={{
          width: isPortrait ? "90vw" : "50vw",
        }}
        alt="Word Master ロゴイメージ"
      />
      {isLoginUser === "yes" && <Loading onMarginTop={false} />}
    </>
  );
};

export default Transition(Start);

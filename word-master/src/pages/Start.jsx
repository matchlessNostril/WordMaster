import { useIsPortrait } from "../hooks";
import { Transition, Loading } from "../components";

const Start = () => {
  // 자동 로그인 사용자인지 확인
  const isLoginUser = localStorage.getItem("isLoginUser");
  const isPortrait = useIsPortrait();

  return (
    <>
      <img
        src={require("../assets/images/slogan.png")}
        style={{ width: isPortrait ? "70vw" : "30vw" }}
      />
      {/* 자동 로그인 사용자의 경우, '로그인 중' 로딩 출력 */}
      {isLoginUser === "yes" && <Loading onMarginTop={false} />}
    </>
  );
};

export default Transition(Start);

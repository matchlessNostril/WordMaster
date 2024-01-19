// Router
import { Outlet } from "react-router-dom";
import Transition from "../../components/Transition";

const Join = () => {
  return (
    <>
      <h1>로그인/회원가입</h1>
      <Outlet />
    </>
  );
};

export default Transition(Join);

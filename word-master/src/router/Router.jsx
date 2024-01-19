// Router
import { Routes, Route, useLocation } from "react-router-dom";
// Pages
import Start from "../pages/Start";
import Join from "../pages/join/Join";
import Login from "../pages/join/Login";
import Regist from "../pages/join/Regist";

const Router = () => {
  const location = useLocation();

  return (
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Start />} />
        <Route path="/Join" element={<Join />}>
          {/* [중첩 라우팅] Outlet : 하위 컴포넌트를 렌더링할 곳을 표시 */}
          <Route path="Login" element={<Login />} />
          <Route path="Regist" element={<Regist />} />
        </Route>
      </Routes>
  );
};

export default Router;

// 페이지 전환 애니메이션 라이브러리
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  Start,
  Join,
  Main,
  VocaList,
  SaveVoca,
  Voca,
  TestList,
  CreateTest,
  SetTest,
  Test,
} from "../pages";
import { useEffect } from "react";
import { toast } from "react-toastify";

const privateRoutes = [
  { path: "/Main", page: <Main /> },
  { path: "/VocaList", page: <VocaList /> },
  { path: "/SaveVoca", page: <SaveVoca /> },
  { path: "/Voca", page: <Voca /> },
  { path: "/TestList", page: <TestList /> },
  { path: "/CreateTest", page: <CreateTest /> },
  { path: "/SetTest", page: <SetTest /> },
  { path: "/Test", page: <Test /> },
];

// 인증 여부 확인 후, 화면 렌더링 또는 화면 이동
const PrivatePage = ({ isLoginUser, page: Page }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoginUser) {
      toast.error("ログイン後、アクセス可能です。");
      navigate("/");
    }
  }, []);

  return isLoginUser && Page;
};

const Router = () => {
  // 화면 이동 애니메이션을 적용하기 위해서는
  // 현재 화면이 바뀌었음을 증명할 key 값이 있어야 함
  const location = useLocation();
  const isLoginUser = localStorage.getItem("isLoginUser");

  return (
    <AnimatePresence>
      {/* key로 location.pathname을 전달하여 다른 화면이 되었음을 인지 */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Start />} />
        <Route path="/Join" element={<Join />} />
        {privateRoutes.map(({ path, page }) => (
          <Route
            key={path}
            path={path}
            element={<PrivatePage {...{ isLoginUser, page }} />}
          />
        ))}
      </Routes>
    </AnimatePresence>
  );
};

export default Router;

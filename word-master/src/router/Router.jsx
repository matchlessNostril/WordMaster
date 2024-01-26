// 페이지 전환 애니메이션 라이브러리
import { AnimatePresence } from "framer-motion";
// Router
import { Routes, Route, useLocation } from "react-router-dom";
// Pages
import Start from "../pages/Start";
import Join from "../pages/Join";
import Main from "../pages/Main";
import VocaList from "../pages/Voca/VocaList";
import CreateVoca from "../pages/Voca/CreateVoca";
import TestList from "../pages/Test/TestList";

const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Start />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/VocaList" element={<VocaList />} />
        <Route path="/CreateVoca" element={<CreateVoca />} />
        <Route path="/TestList" element={<TestList />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;

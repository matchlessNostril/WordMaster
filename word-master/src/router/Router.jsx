// 페이지 전환 애니메이션 라이브러리
import { AnimatePresence } from "framer-motion";
// Router
import { Routes, Route, useLocation } from "react-router-dom";
// Pages
import Start from "../pages/Start";
import Join from "../pages/Join";
import Main from "../pages/Main";
import VocaList from "../pages/Voca/VocaList";
import SaveVoca from "../pages/Voca/SaveVoca";
import Voca from "../pages/Voca/Voca";
import TestList from "../pages/Test/TestList";
import CreateTest from "../pages/Test/CreateTest";
import SetTest from "../pages/Test/SetTest";

const Router = () => {
  const location = useLocation();

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Start />} />
        <Route path="/Join" element={<Join />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/VocaList" element={<VocaList />} />
        <Route path="/SaveVoca" element={<SaveVoca />} />
        <Route path="/Voca" element={<Voca />} />
        <Route path="/TestList" element={<TestList />} />
        <Route path="/CreateTest" element={<CreateTest />} />
        <Route path="/SetTest" element={<SetTest />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;

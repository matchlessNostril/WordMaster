// 페이지 전환 애니메이션 라이브러리
import { AnimatePresence } from "framer-motion";
// Router
import { Routes, Route, useLocation } from "react-router-dom";
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

const Router = () => {
  // 화면 이동 애니메이션을 적용하기 위해서는
  // 현재 화면이 바뀌었음을 증명할 key 값이 있어야 함
  const location = useLocation();

  return (
    <AnimatePresence>
      {/* key로 location.pathname을 전달하여 다른 화면이 되었음을 인지 */}
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
        <Route path="/Test" element={<Test />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Router;

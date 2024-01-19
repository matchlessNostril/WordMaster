import { motion } from "framer-motion";

const Transition = (Page) => {
  // 이것도 () => (<></>)로 하지 않으면 에러 남.
  return () => (
    <>
      <motion.div
        style={{ position: "fixed" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Page />
      </motion.div>
    </>
  );
};

export default Transition;

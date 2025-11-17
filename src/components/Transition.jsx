import { motion } from "framer-motion";

const Transition = (Page) => {
  return () => (
    <>
      <motion.div
        style={{ position: "fixed" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}>
        <Page />
      </motion.div>
    </>
  );
};

export default Transition;

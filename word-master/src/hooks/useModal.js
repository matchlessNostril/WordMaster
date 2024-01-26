// Hook
import { useState, useCallback } from "react";

const useModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const onClickOpenModal = useCallback((content) => {
    setModalContent(content);
    setOpenModal(true);
  }, []);

  return [openModal, setOpenModal, modalContent, onClickOpenModal];
};

export default useModal;

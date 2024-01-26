// Hook
import { useState, useCallback } from "react";

const usePopOver = () => {
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const onClickPopoverBtn = useCallback((event) => {
    // 이미 Anchor가 있다면 취소
    setPopoverAnchor((prevAnchor) => (prevAnchor ? null : event.currentTarget));
  }, []);

  return [popoverAnchor, setPopoverAnchor, onClickPopoverBtn];
};

export default usePopOver;

import { useState, useCallback } from "react";

const usePopOver = () => {
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const handleClickPopoverBtn = useCallback((event) => {
    setPopoverAnchor((prevAnchor) => (prevAnchor ? null : event.currentTarget));
  }, []);

  return [popoverAnchor, setPopoverAnchor, handleClickPopoverBtn];
};

export default usePopOver;

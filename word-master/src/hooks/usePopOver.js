import { useState, useCallback } from "react";

const usePopOver = () => {
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const onClickPopoverBtn = useCallback((event) => {
    setPopoverAnchor((prevAnchor) => (prevAnchor ? null : event.currentTarget));
  }, []);

  return [popoverAnchor, setPopoverAnchor, onClickPopoverBtn];
};

export default usePopOver;

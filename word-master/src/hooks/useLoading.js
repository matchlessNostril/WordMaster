// Hook
import { useState } from "react";

const useLoading = () => {
  const [onLoading, setOnLoading] = useState(false);

  return [onLoading, setOnLoading];
};

export default useLoading;

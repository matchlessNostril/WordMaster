// Hook
import { useState } from "react";

const useLoading = () => {
  const [onLoading, setOnLoading] = useState(true);

  return [onLoading, setOnLoading];
};

export default useLoading;

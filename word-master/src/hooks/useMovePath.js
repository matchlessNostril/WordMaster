import { useNavigate } from "react-router-dom";

const useMovePath = () => {
  const navigate = useNavigate();
  return navigate;
};

export default useMovePath;

// Styled-components
import styled from "styled-components";
// MUI
import { useMediaQuery } from "@mui/material";
// Component
import Transition from "../components/Transition";

const CoverImg = styled.img`
  width: 100%;
  height: 100%;
`;

const Start = () => {
  const isPortrait = useMediaQuery("(orientation: portrait)");

  // 빈 Fragment가 아니라 최상위를 <div>로 감싸면 Transition 적용이 안되고 에러 발생함..
  return (
    <>
      <CoverImg
        src={
          isPortrait
            ? require("../assets/images/startCover_h.jpg")
            : require("../assets/images/startCover_w.png")
        }
      />
    </>
  );
};

export default Transition(Start);

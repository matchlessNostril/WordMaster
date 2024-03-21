import React from "react";
import StyledButton from "./StyledButton";

const GoogleBtn = ({ method, handleClick }) => {
  return (
    <StyledButton variant="outlined" onClick={handleClick}>
      <img
        src={require("../../../../assets/icons/google.png")}
        alt="구글로 간편 시작"
        style={{
          width: "30px",
          height: "30px",
          marginRight: "20px",
        }}
      />
      Google 계정으로 {method}
    </StyledButton>
  );
};

// method, onClickGoogleAuth는 각각 string, function으로 원시 타입이기 때문에,
// 얕은 비교만 하면 되기 때문에 React.memo의 두 번째 매개변수를 비워도 됨.
export default React.memo(GoogleBtn);

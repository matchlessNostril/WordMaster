import { Container } from "@mui/material";

const Loading = ({ onMarginTop = true }) => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: onMarginTop ? "30vh" : "0",
      }}
    >
      <img
        src={require("../assets/images/loading.gif")}
        style={{ width: "50px", height: "50px" }}
      />
    </Container>
  );
};

export default Loading;

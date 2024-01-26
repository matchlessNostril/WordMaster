import { Container } from "@mui/material";

const Loading = () => {
  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "30vh",
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

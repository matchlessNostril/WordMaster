import { Container } from "@mui/material";

const NoFile = ({ text }) => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "30vh",
      }}
    >
      <img
        src={require("../assets/icons/empty.png")}
        style={{
          width: "40px",
          height: "40px",
          marginBottom: "20px",
        }}
      />
      {text}
    </Container>
  );
};

export default NoFile;

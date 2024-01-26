import { Container } from "@mui/material";

const NoFile = () => {
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
      아직 생성된 파일이 없습니다.
    </Container>
  );
};

export default NoFile;

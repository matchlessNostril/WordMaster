import { Box } from "@mui/material";
import Header from "./components/Header";
import Router from "./router/Router";

function App() {
  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="Column"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: "100vw",
          height: "95vh",
          marginTop: "5vh",
        }}
      >
        <Router />
      </Box>
    </>
  );
}

export default App;

import { Box } from "@mui/material";
import Header from "./components/Header";
import Router from "./router/Router";
import { ToastContainer, Bounce } from "react-toastify";

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
      <ToastContainer
        position="bottom-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        toastStyle={{
          width: "fit-content",
          minWidth: "300px",
          maxWidth: "425px",
          fontSize: "14px",
        }}
      />
    </>
  );
}

export default App;

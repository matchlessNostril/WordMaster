import Header from "./components/Header";
import Router from "./router/Router";
import ColumnFlexBox from "./layout/ColumnFlexBox";

function App() {
  return (
    <>
      <Header />
      <ColumnFlexBox>
        <Router />
      </ColumnFlexBox>
    </>
  );
}

export default App;

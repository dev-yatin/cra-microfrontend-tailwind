// import Sample from "components/pages/Sample/Sample";
import Routes from "components/routes/Routes";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { baseTheme } from "themes";
import { applyTheme } from "themes/utils";

function App() {
  let history = useHistory();
  if (history.location.pathname === "/") {
<<<<<<< HEAD
    history.push("/test");
=======
    history.push("/home");
>>>>>>> d3418496e2cd39ed99092dc252d790286e57ea27
  }
  useEffect(() => {
    applyTheme(baseTheme);
  }, []);

  return (
<<<<<<< HEAD
    <>
      <Routes />
    </>
=======
    <div className="h-screen">
      <Routes />
    </div>
>>>>>>> d3418496e2cd39ed99092dc252d790286e57ea27
  );
}

export default App;

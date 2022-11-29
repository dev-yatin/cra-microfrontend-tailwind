// import Sample from "components/pages/Sample/Sample";
import Routes from "components/routes/Routes";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { baseTheme } from "themes";
import { applyTheme } from "themes/utils";

function App() {
  let history = useHistory();
  if (history.location.pathname === "/") {
    history.push("/test");
  }
  useEffect(() => {
    applyTheme(baseTheme);
  }, []);

  return (
    <>
      <Routes />
    </>
  );
}

export default App;

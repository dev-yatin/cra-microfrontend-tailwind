// import Sample from "components/pages/Sample/Sample";
import ErrorBoundary from "components/errorBoundary/ErrorBoundary";
import Routes from "components/routes/Routes";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { baseTheme } from "themes";
import { applyTheme } from "themes/utils";

function App() {
  let history = useHistory();
  if (history.location.pathname === "/") {
    history.push("/home");
  }
  useEffect(() => {
    applyTheme(baseTheme);
  }, []);

  return (
    <div className="h-screen">
      <ErrorBoundary>
        <Routes />
      </ErrorBoundary>
    </div>
  );
}

export default App;

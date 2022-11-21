// import Sample from "components/pages/Sample/Sample";
import Routes from "components/routes/Routes";
import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { baseTheme } from "themes";
import { applyTheme } from "themes/utils";
function App() {
  useEffect(() => {
    applyTheme(baseTheme);
  }, []);

  return (
    // <div className="App">
    //   <Sample />
    // </div>
    <Router>
      <Routes />

      {/* <Suspense fallback={<FallbackUI />}>
              <ErrorBoundary fallback={<ErrorFalback />}>
                <Routes  />
              </ErrorBoundary>
            </Suspense> */}
    </Router>
  );
}

export default App;

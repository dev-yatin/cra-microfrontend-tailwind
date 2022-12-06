// import Sample from "components/pages/Sample/Sample";
import * as Sentry from "@sentry/react";
import Routes from "components/routes/Routes";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { baseTheme } from "themes";
import { applyTheme } from "themes/utils";
// import ErrorBoundary from   onents/errorBoundary/ErrorBoundary";
import { ErrorFallback, myErrorHandler } from "ErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
function FallbackComponent() {
  return <div>An error has occured</div>;
}

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
      {/* <Sentry.ErrorBoundary fallback={FallbackComponent} showDialog>
        <Routes />
      </Sentry.ErrorBoundary> */}
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => console.log("Error")}
        onError={myErrorHandler}
      >
        <Routes />
      </ErrorBoundary>
    </div>
  );
}

export default Sentry.withProfiler(App);

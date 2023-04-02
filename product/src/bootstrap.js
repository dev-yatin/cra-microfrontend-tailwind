import ThemeContext from "context/ThemeContext";
import { ErrorFallback, myErrorHandler } from "ErrorFallback";
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// Sentry.init({
//   dsn: "https://46aa4195c65247afb58ac5bdf4a633e4@o4504280969183232.ingest.sentry.io/4504281273794560",
//   integrations: [new BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
// });

const mount = (el) => {
  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => console.log("testtest")}
        onError={myErrorHandler}
      >
        <BrowserRouter>
          <ThemeContext>
            <App />
          </ThemeContext>
        </BrowserRouter>
      </ErrorBoundary>
    </React.StrictMode>
  );
};

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
//};

const environment = "development";
if (environment === "development") {
  // If we running in development mode and in isolation
  const rootEl = document.querySelector("#_product-root");
  if (rootEl) {
    mount(rootEl);
  }
}

// If we running through container
// export mount function
export { mount };

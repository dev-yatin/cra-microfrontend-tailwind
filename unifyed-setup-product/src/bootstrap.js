import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const mount = (el) => {
  const root = ReactDOM.createRoot(el);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  // If you want to start measuring performance in your app, pass a function
  // to log results (for example: reportWebVitals(console.log))
  // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
  reportWebVitals();
};

const environment = process.env.NODE_ENV;
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
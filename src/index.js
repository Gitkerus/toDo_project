import React from "react";
import ReactDOM from "react-dom/client";

import AuthProvider from "react-auth-kit/AuthProvider";
import createStore from "react-auth-kit/createStore";

import { BrowserRouter } from "react-router-dom";

import "the-new-css-reset/css/reset.css";
import "./index.css";

import App from "./App";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { IncomeContextProvider } from "./context/IncomeContext";
import { authContextProvider } from "./context/authContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <authContextProvider>
      <IncomeContextProvider>
        <App />
      </IncomeContextProvider>
    </authContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { IncomeContextProvider } from "./context/IncomeContext";
import { ExpenseContextProvider } from "./context/ExpenseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <IncomeContextProvider>
      <ExpenseContextProvider>
        <App />
      </ExpenseContextProvider>
    </IncomeContextProvider>
  </React.StrictMode>
);

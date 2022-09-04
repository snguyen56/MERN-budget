import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { IncomeContextProvider } from "./context/IncomeContext";
import { ExpenseContextProvider } from "./context/ExpenseContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ExpenseContextProvider>
        <IncomeContextProvider>
          <App />
        </IncomeContextProvider>
      </ExpenseContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);

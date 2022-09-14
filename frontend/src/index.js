import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { IncomeContextProvider } from "./context/IncomeContext";
import { ExpenseContextProvider } from "./context/ExpenseContext";
import { ProfitContextProvider } from "./context/ProfitContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <BrowserRouter>
    <AuthContextProvider>
      <ExpenseContextProvider>
        <IncomeContextProvider>
          <ProfitContextProvider>
            <App />
          </ProfitContextProvider>
        </IncomeContextProvider>
      </ExpenseContextProvider>
    </AuthContextProvider>
  </BrowserRouter>
  //</React.StrictMode>
);

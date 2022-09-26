import "./App.scss";
import "./custom.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { Route, Routes, Navigate } from "react-router-dom";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Budgets from "./pages/Budgets";
import { useAuthContext } from "./hooks/useAuthContext";

function App() {
  const { user } = useAuthContext();

  return (
    <div className="wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Routes>
          <Route
            path="/"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/signup"
            element={!user ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/income"
            element={user ? <Income /> : <Navigate to="/login" />}
          />
          <Route
            path="/expenses"
            element={user ? <Expenses /> : <Navigate to="/login" />}
          />
          <Route
            path="/budgets"
            element={user ? <Budgets /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;

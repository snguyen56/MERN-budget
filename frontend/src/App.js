import "./App.scss";
import "./custom.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import { Route, Routes } from "react-router-dom";
import Expenses from "./pages/Expenses";
import Income from "./pages/Income";

function App() {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expenses" element={<Expenses />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;

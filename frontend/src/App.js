// import "./App.scss";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

import Container from "react-bootstrap/Container";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="wrapper">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="content">
        <Dashboard />
      </div>
    </div>
  );
}

export default App;

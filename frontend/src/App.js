import "./App.scss";
import "./custom.scss";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";

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

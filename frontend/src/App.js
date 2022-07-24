import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <body>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div>
        <h1>Main content</h1>
      </div>
    </body>
  );
}

export default App;

import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
      <div className="mx-auto max-w-7xl px-2">
        <Navbar />
        <Outlet />  
      </div>
  );
}

export default App;

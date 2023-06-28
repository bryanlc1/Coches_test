import Navbar from "./components/commons/Navbar";
import { Outlet } from "react-router-dom";
import { TestProvider } from "./context/testContext";

function App() {
  return (
    <TestProvider>
      <div className="mx-auto max-w-7xl px-2">
        <Navbar />
        <Outlet />
      </div>
    </TestProvider>
  );
}

export default App;

import { Routes, Route /* useLocation  */ } from "react-router-dom";
import Home from "./views/Home/Home";

function App() {
  // const location = useLocation()
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

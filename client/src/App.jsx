import { Routes, Route } from "react-router-dom";
import Home from "./views/Home/Home";
import Admin from "./views/Admin/Admin";
import DetailProduct from "./views/DetailProduct/DetailProduct";
import Register from "./views/Register/Register";
import UserBlocked from "./components/Userblocked";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="admin" element={<Admin />} />
        <Route exact path="detail/:id" element={<DetailProduct />} />
        <Route exact path="register" element={<Register />} />
        <Route exact path="admin/users" element={<UserBlocked />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;

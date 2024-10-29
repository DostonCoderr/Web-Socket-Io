import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Notifications from "./components/Notifications";
import "./index.css"



export default function App() {
  return (
    <nav className="bg-gray-100 p-4 flex justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notification" element={<Notifications/>}/>
      </Routes>
    </nav>
  );
}

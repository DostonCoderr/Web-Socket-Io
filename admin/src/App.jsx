// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AdminPanel from "./pages/AdminPanel";


export default function App() {
  return (
    <Router>
      <nav className="bg-gray-200 p-4 flex justify-between">
       
        <Link to="/admin">Admin Panel</Link>
      </nav>

      <Routes>
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

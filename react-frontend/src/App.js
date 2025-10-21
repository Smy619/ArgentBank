import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import Transactions from "./pages/Transactions/Transactions";

import "./index.css";

function App() {
  return (
    <div className="main-content">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transactions/:accountId" element={<Transactions />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

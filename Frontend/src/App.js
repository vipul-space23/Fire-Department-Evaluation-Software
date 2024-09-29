import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import SignUp from "./Pages/Signup";
import Dashboard from "./Components/Dashboard";
import NocDashboard from "./Pages/NocDashboard";
import Sidebar from "./Components/Sidebar";
import './Components/Sidebarmod.css';
import './Pages/CSS/Dashboardmod.css';
import Inspection from "./Pages/Inspection";
import UserDash from './Pages/UserDash';
import Reports from './Pages/Reports';  // Import the Reports component

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Router>
      <div className={`layout ${sidebarOpen ? 'sidebar-open' : ''}`}>
        {/* <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> */}
        <div className="main-content">
          <Routes>
            {/* Routes without Sidebar */}
            <Route path="/" element={<SignUp />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            
            {/* Layout with Sidebar */}
            <Route path="/NocDashboard" element={<NocDashboard />} />
            <Route path="/Inspection" element={<Inspection />} />
            <Route path="/UserDash" element={<UserDash />} />
            
            {/* Add the Reports route */}
            <Route path="/Reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

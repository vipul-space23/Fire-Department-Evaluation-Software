// Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from './Components/Sidebar';
import DashboardStats from './Components/DashboardStats';
import NocRequests from './Components/NocRequests';
import '../Pages/CSS/Dashboardmod.css'

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Toggle Sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen); // Toggle between open and closed
    };

    return (
        <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Hamburger Icon */}
            <span className={`hamburger ${sidebarOpen ? 'close' : ''}`} onClick={toggleSidebar}>
                {sidebarOpen ? '✖' : '☰'} {/* Change icon based on state */}
            </span>

            {/* Sidebar */}
            <div className={`sidebar ${sidebarOpen ? 'active' : ''}`}>
                <Sidebar toggleSidebar={toggleSidebar} /> {/* Pass the toggle function */}
            </div>

            {/* Main dashboard content */}
            <div className="dashboard-main">
                <DashboardStats />
                <NocRequests />
            </div>
        </div>
    );
}

export default Dashboard;

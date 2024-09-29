import React, { useState } from 'react';
import Sidebar from './Sidebar';
import DashboardStats from './DashboardStats';
import NocRequests from './NocRequests';
import '../Pages/CSS/Dashboardmod.css'; // Import the dashboard-specific styles

// Constants
const SIDEBAR_WIDTH = 250; // Sidebar width for calculation

function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Toggle Sidebar
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen); // Toggle between open and closed
    };

    return (
        <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
            {/* Hamburger Icon */}
            <span className="hamburger" onClick={toggleSidebar}>
                {sidebarOpen ? '✖' : '☰'} {/* Change icon based on state */}
            </span>

            {/* Sidebar */}
            <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

            {/* Main dashboard content */}
            <div className="dashboard-main">
                <h1 id="head">Fire Fighter's</h1>
                <DashboardStats />
                <NocRequests toggleSidebar={toggleSidebar} isOpen={sidebarOpen} /> {/* Pass props */}
            </div>
        </div>
    );
}

export default Dashboard;

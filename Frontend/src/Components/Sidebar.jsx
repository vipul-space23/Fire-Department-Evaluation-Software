import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div className={`sidebar ${isOpen ? 'active' : ''}`}>
      <h5>Menu</h5>
      <ul>
        <li><a href="/Dashboard">Dashboard</a></li>
        <li><a href="/NocDashboard">NOC Requests</a></li>
        <li><a href="/Login">Sign Out</a></li>
        <li><a href="/Inspection"> Inspection</a></li>
        {/* Add more navigation links as needed */}
      </ul>
      <div className="close-section">
        <button className="close-btn" onClick={toggleSidebar}>Close</button>
      </div>
    </div>
  );
}

export default Sidebar;

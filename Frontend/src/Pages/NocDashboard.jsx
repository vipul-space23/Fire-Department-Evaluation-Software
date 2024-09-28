import React, { useState } from "react";
import "./CSS/Nocdash.css";
import Sidebar from "../Components/Sidebar"; // Ensure Sidebar is imported
import './CSS/Dashboardmod.css'; // Import necessary CSS

const NocDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [requests] = useState([
    { id: "NOOC-010", title: "Introduce Advanced Firefighting Equipment", status: "Approved", date: "2023-09-25", requester: "Chris Taylor" },
    { id: "NOOC-008", title: "Revise Fire Safety Inspection Checklist", status: "Approved", date: "2023-09-22", requester: "Sarah Williams" },
    { id: "NOOC-005", title: "Upgrade Communication Systems", status: "Approved", date: "2023-09-20", requester: "Mike Johnson" },
    { id: "NOOC-003", title: "Implement New Emergency Response Protocol", status: "Approved", date: "2023-09-18", requester: "Jane Smith" },
    { id: "NOOC-001", title: "Update Fire Engine Maintenance Schedule", status: "Approved", date: "2023-09-15", requester: "John Doe" },
  ]);

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`noc-dashboard-wrapper dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <span className={`hamburger ${sidebarOpen ? 'close' : ''}`} onClick={toggleSidebar}>
        {sidebarOpen ? '✖' : '☰'} {/* Change icon based on state */}
      </span>
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} /> {/* Render Sidebar */}
      
      <div className="noc-dashboard-container">
        <h1>Approved NOOC Requests Dashboard</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search requests..." />
          <button className="search-btn">🔍</button>
        </div>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Title</th>
              <th>Status</th>
              <th>Date</th>
              <th>Requester</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.title}</td>
                <td><span className="status-approved">{request.status}</span></td>
                <td>{request.date}</td>
                <td>{request.requester}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="filter-sort">
          <button className="filter-btn">Filter</button>
          <button className="sort-btn">Sort</button>
        </div>
      </div>
    </div>
  );
};

export default NocDashboard;

import React, { useState } from "react";
import "./CSS/Inspection.css"; // Your CSS file
import Sidebar from "../Components/Sidebar"; // Import your Sidebar component

const Inspection = () => {
  const [inspections] = useState([
    { id: "INS-001", location: "123 Main St", dateTime: "10/1/2023, 9:00:00 AM", officer: "John Doe", status: "Scheduled" },
    { id: "INS-002", location: "456 Elm St", dateTime: "10/5/2023, 2:00:00 PM", officer: "Jane Smith", status: "Completed" },
    { id: "INS-003", location: "789 Oak Ave", dateTime: "10/10/2023, 11:00:00 AM", officer: "Mike Johnson", status: "Scheduled" },
  ]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className={`dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="dashboard-main">
        <h1>Fire Department Inspections</h1>
        <h2>Scheduled Inspections</h2>
        <table className="inspections-table">
          <thead>
            <tr>
              <th>Inspection ID</th>
              <th>Location</th>
              <th>Date & Time</th>
              <th>Assigned Officer</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((inspection) => (
              <tr key={inspection.id}>
                <td>{inspection.id}</td>
                <td>{inspection.location}</td>
                <td>{inspection.dateTime}</td>
                <td>{inspection.officer}</td>
                <td><span className={`status-${inspection.status.toLowerCase()}`}>{inspection.status}</span></td>
                <td>
                  <button className="action-btn">👁️</button>
                  <button className="action-btn">🗑️</button>
                  <button className="action-btn">✏️</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>Schedule New Inspection</h2>
        <form className="new-inspection-form">
          <input type="text" placeholder="Enter inspection location" required />
          <input type="datetime-local" required />
          <button type="submit">Schedule Inspection</button>
        </form>
      </div>
    </div>
  );
};

export default Inspection;

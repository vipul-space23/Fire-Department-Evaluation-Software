import React, { useState } from 'react';
import ApplyNOC from './ApplyNOC'; // Correct path for importing ApplyNOC component
import TrackStatus from './TrackStatus';
import './CSS/UserDash.css';

function UserDash() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar visibility

  const currentStatus = "Inspection Scheduled"; // Example status

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span className="material-icons">menu</span>
        </button>
        <h3>Fire Dept. NOC</h3>
        <ul>
          <li
            className={activeTab === 'Home' ? 'active' : ''}
            onClick={() => {
              setActiveTab('Home');
              setIsSidebarOpen(false); // Close sidebar on selection
            }}
          >
            <span className="material-icons">home</span> Home
          </li>
          <li
            className={activeTab === 'Apply' ? 'active' : ''}
            onClick={() => {
              setActiveTab('Apply');
              setIsSidebarOpen(false); // Close sidebar on selection
            }}
          >
            <span className="material-icons">description</span> Apply for NOC
          </li>
          <li
            className={activeTab === 'Track' ? 'active' : ''}
            onClick={() => {
              setActiveTab('Track');
              setIsSidebarOpen(false); // Close sidebar on selection
            }}
          >
            <span className="material-icons">find_in_page</span> Track Application
          </li>
        </ul>
        <button className="logout-button">
          <span className="material-icons">logout</span> Logout
        </button>
      </div>
      <div className="content">
        <button className="sidebar-toggle" onClick={toggleSidebar}>
          <span className="material-icons">menu</span>
        </button>
        {activeTab === 'Home' && (
          <div className="welcome-message">
            <h2 className="animated-text">Welcome to Fire Department NOC Portal</h2>
            <p>Apply for NOC or track your existing application</p>
            <p>Use the sidebar to navigate between different sections.</p>
          </div>
        )}
        {activeTab === 'Apply' && <ApplyNOC />}
        {activeTab === 'Track' && <TrackStatus currentStatus={currentStatus} />}
      </div>
    </div>
  );
}

export default UserDash;

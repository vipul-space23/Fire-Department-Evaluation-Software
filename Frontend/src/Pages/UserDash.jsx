import React, { useState } from 'react';
import ApplyNOC from './ApplyNOC'; // Correct path for importing ApplyNOC component
import TrackStatus from './TrackStatus';

import '../'; // Ensure UserDash.css is in the CSS subdirectory of Pages

function UserDash() {
  const [activeTab, setActiveTab] = useState('Home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar visibility state

  const currentStatus = "Inspection Scheduled"; // Example status

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar visibility
  };

  return (
    <div className="app-container">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <h3>FIRE DEPT. NOC</h3>
        <ul>
          <li
            className={activeTab === 'Home' ? 'active' : ''}
            onClick={() => {
              setActiveTab('Home');
              setIsSidebarOpen(false); // Close sidebar on selection
            }}
          >
            <span className="material-icons"></span> Home
          </li>
          <li
            className={activeTab === 'Apply' ? 'active' : ''}
            onClick={() => {
              setActiveTab('Apply');
              setIsSidebarOpen(false); // Close sidebar on selection
            }}
          >
            <span className="material-icons"></span> Apply for NOC
          </li>
          <li
            className={activeTab === 'Track' ? 'active' : ''}
            onClick={() => {
              setActiveTab('Track');
              setIsSidebarOpen(false); // Close sidebar on selection
            }}
          >
            <span className="material-icons"></span> Track Application
          </li>
        </ul>
        <button className="logout-button">
          <span className="material-icons"></span> Logout
        </button>
      </div>

      <div className="content">
        <span className={`hamburger ${isSidebarOpen ? 'close' : ''}`} onClick={toggleSidebar}>
          {isSidebarOpen ? '' : ''} {/* Change icon based on state */}
        </span>

        {activeTab === 'Home' && (
          <div className="welcome-message">
            <h2>Welcome to Fire Department NOC Portal</h2>
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

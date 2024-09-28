// Sidebar.jsx
import React from 'react';
import './Sidebar.css'; // Ensure you have a CSS file for styling

function Sidebar({ toggleSidebar }) {
    return (
        <div>
            <h5 style={{ textAlign: 'center', color: 'white' }}>Admin Dashboard</h5>
            <ul>
                <li><a href="#">Dashboard</a></li>
                <li><a href="#">NOC Requests</a></li>
                <li><a href="#">Inspections</a></li>
                <li><a href="#">Feedback</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
            {/* Close button with label */}
            <div className="close-section">
                <button onClick={toggleSidebar} className="close-btn">
                    Close
                </button>
            </div>
        </div>
    );
}

export default Sidebar;

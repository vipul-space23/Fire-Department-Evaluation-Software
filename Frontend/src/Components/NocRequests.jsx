import React from 'react';
import Sidebar from './Sidebar'; // Import the Sidebar

function NocRequests({ toggleSidebar, isOpen }) {
    return (
        <div>
            {/* Sidebar should also be rendered in NocRequests */}
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />

            {/* NOC Requests content */}
            <div className="noc-requests">
                <h2>NOC Requests</h2>
                {/* Add your NOC Requests content here */}
            </div>
        </div>
    );
}

export default NocRequests;

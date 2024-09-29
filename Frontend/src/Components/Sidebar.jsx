import React from 'react';
import './Sidebar.css';

// Constants
const SIDEBAR_MENU_ITEMS = [
    { label: "Dashboard", href: "/Dashboard" },
    { label: "NOC Requests", href: "/NocDashboard" },
    { label: "Inspection", href: "/Inspection" },
    { label: "Reports", href: "/Reports" },  // Added Reports section
    { label: "Sign Out", href: "/Login" }
];

function Sidebar({ isOpen, toggleSidebar }) {
    return (
        <div className={`sidebar ${isOpen ? 'active' : ''}`}>
            <h5>Menu</h5>
            <ul>
                {SIDEBAR_MENU_ITEMS.map((item, index) => (
                    <li key={index}>
                        <a href={item.href}>{item.label}</a>
                    </li>
                ))}
            </ul>
            <div className="close-section">
                <button className="close-btn" onClick={toggleSidebar}>Close</button>
            </div>
        </div>
    );
}

export default Sidebar;

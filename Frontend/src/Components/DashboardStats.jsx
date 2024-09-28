import React from 'react';
import '../Pages/CSS/Dashboardmod.css'; // Ensure the CSS is imported

function DashboardStats() {
  return (
    <div className="dashboard-stats">
      <div className="dashboard-stat">
        <div className="stat-number">1,234</div>
        <div className="stat-label">Total NOC's</div>
      </div>

      <div className="dashboard-stat">
        <div className="stat-number">56</div>
        <div className="stat-label">Pending Inspections</div>
      </div>

      <div className="dashboard-stat">
        <div className="stat-number">23</div>
        <div className="stat-label">Inspections Cleared</div>
      </div>
    </div>
  );
}

export default DashboardStats;

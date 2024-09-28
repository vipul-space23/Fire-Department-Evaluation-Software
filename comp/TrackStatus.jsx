import React from 'react';
import './TrackStatus.css';

const applicationStatuses = [
  "Application Submitted",
  "Application Under Review",
  "Inspection Scheduled",
  "NOC Issued",
];

function TrackStatus({ currentStatus }) {
  return (
    <div className="track-status-container">
      <h2>Track Your Application</h2>
      <p>View the current status of your NOC application</p>

      <ul className="status-list">
        {applicationStatuses.map((status, index) => {
          let statusClass = '';

          if (status === currentStatus) {
            statusClass = 'processing';
          } else if (applicationStatuses.indexOf(currentStatus) > index) {
            statusClass = 'completed';
          }

          return (
            <li key={index} className={`status-item ${statusClass}`}>
              <span className="status-number">{index + 1}</span> {status}
              {statusClass === 'processing' && <span className="status-progress">Processing...</span>}
              {statusClass === 'completed' && <span className="status-done">Completed</span>}
            </li>
          );
        })}
      </ul>

      <p className="current-status">
        Current Status: {currentStatus}
        <br />
        {applicationStatuses.indexOf(currentStatus) === applicationStatuses.length - 1
          ? 'Process Completed'
          : 'Pending Further Steps'}
      </p>
    </div>
  );
}

export default TrackStatus;

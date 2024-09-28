import React from 'react';

function NocRequests() {
  return (
    <div className="noc-requests p-3">
      <h4>NOC Requests</h4>
      <table className="table">
        <thead>
          <tr>
            <th>NOC Number</th>
            <th>Application Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NOC-2023-001</td>
            <td>2023-09-01</td>
            <td>Pending</td>
            <td>
              <button className="btn btn-success">Approve</button>
              <button className="btn btn-danger">Reject</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default NocRequests;

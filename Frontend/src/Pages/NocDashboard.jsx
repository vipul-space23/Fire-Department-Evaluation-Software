import React, { useState, useEffect } from "react";
import axios from 'axios';
import Sidebar from "../Components/Sidebar"; // Ensure Sidebar is imported
import './CSS/Nocdash.css'; // Import necessary CSS

const NocDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for sidebar visibility
  const [requests, setRequests] = useState([]); // State for NOC requests
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filterStatus, setFilterStatus] = useState(""); // State for filter

  // Function to toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Function to fetch NOCs from the database
  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/nocs'); // Fetch NOCs from API
      setRequests(response.data); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching NOCs:", error);
    }
  };

  // Effect to fetch requests on component mount
  useEffect(() => {
    fetchRequests();
  }, []);

  // Function to handle search
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to handle filter
  const handleFilter = (status) => {
    setFilterStatus(status);
  };

  // Function to approve a NOC application
  const approveRequest = async (id) => {
    try {
      await axios.post(`http://localhost:5001/api/nocs/${id}/approve`); // Send approve request to API
      fetchRequests(); // Refetch requests after approval
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Function to disapprove a NOC application
  const disapproveRequest = async (id) => {
    try {
      await axios.post(`http://localhost:5001/api/nocs/${id}/disapprove`); // Send disapprove request to API
      fetchRequests(); // Refetch requests after disapproval
    } catch (error) {
      console.error("Error disapproving request:", error);
    }
  };

  // Filter and search logic
  const filteredRequests = requests.filter(request =>
    request.propertyDetails?.propertyType?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterStatus ? request.status === filterStatus : true)
  );

  return (
    <div className={`noc-dashboard-wrapper dashboard-container ${sidebarOpen ? 'sidebar-open' : ''}`}>
      <span className={`hamburger ${sidebarOpen ? 'close' : ''}`} onClick={toggleSidebar}>
        {sidebarOpen ? '✖' : '☰'}
      </span>
      
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className="noc-dashboard-container">
        <h1>NOC Requests Dashboard</h1>
        <div className="search-bar">
          <input type="text" placeholder="Search requests..." value={searchTerm} onChange={handleSearch} />
        </div>
        <div className="filter-sort">
          <button className="filter-btn" onClick={() => handleFilter('Approved')}>Show Approved</button>
          <button className="filter-btn" onClick={() => handleFilter('Disapproved')}>Show Disapproved</button>
          <button className="filter-btn" onClick={() => handleFilter('Pending')}>Show Pending</button>
          <button className="filter-btn" onClick={() => handleFilter("")}>Show All</button>
        </div>
        <table className="requests-table">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Property Type</th>
              <th>Status</th>
              <th>Preferred Date</th>
              <th>Requester Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request._id}>
                <td>{request._id}</td>
                <td>{request.propertyDetails?.propertyType}</td>
                <td><span className={`status-${request.status.toLowerCase()}`}>{request.status}</span></td>
                <td>{request.preferredDate}</td>
                <td>{request.applicantInfo?.name}</td>
                <td>
                  <div className="actions-button">
                    <button onClick={() => approveRequest(request._id)}>Approve</button>
                    <button onClick={() => disapproveRequest(request._id)}>Disapprove</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NocDashboard;

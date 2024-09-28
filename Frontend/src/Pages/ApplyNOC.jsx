import React, { useState } from 'react';
import './ApplyNOC.css';

function ApplyNOC() {
  const [applicantInfo, setApplicantInfo] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
  });

  const [propertyDetails, setPropertyDetails] = useState({
    address: '',
    propertyType: '',
    numFloors: '',
    totalArea: '',
  });

  const [fireSafety, setFireSafety] = useState({
    fireExtinguishers: false,
    fireAlarms: false,
    fireExits: 0,
  });

  const [documents, setDocuments] = useState(null);
  const [preferredDate, setPreferredDate] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (applicantInfo.hasOwnProperty(name)) {
      setApplicantInfo({ ...applicantInfo, [name]: value });
    } else if (propertyDetails.hasOwnProperty(name)) {
      setPropertyDetails({ ...propertyDetails, [name]: value });
    }
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFireSafety({ ...fireSafety, [name]: checked });
  };

  const handleFileChange = (e) => {
    setDocuments(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log({
      applicantInfo,
      propertyDetails,
      fireSafety,
      documents,
      preferredDate,
    });
  };

  return (
    <div className="apply-noc-container">
      <h2>Apply for NOC</h2>
      <p>Fill out the form to submit your NOC application</p>

      <form onSubmit={handleSubmit}>
        {/* Section 1: Applicant Information */}
        <div className="form-section">
          <h3>Applicant Information</h3>
          <input
            type="text"
            name="name"
            value={applicantInfo.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={applicantInfo.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="tel"
            name="phone"
            value={applicantInfo.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            type="text"
            name="organization"
            value={applicantInfo.organization}
            onChange={handleChange}
            placeholder="Organization"
            required
          />
        </div>

        {/* Section 2: Property Details */}
        <div className="form-section">
          <h3>Property Details</h3>
          <input
            type="text"
            name="address"
            value={propertyDetails.address}
            onChange={handleChange}
            placeholder="Address"
            required
          />
          <input
            type="text"
            name="propertyType"
            value={propertyDetails.propertyType}
            onChange={handleChange}
            placeholder="Property Type"
            required
          />
          <input
            type="number"
            name="numFloors"
            value={propertyDetails.numFloors}
            onChange={handleChange}
            placeholder="Number of Floors"
            required
          />
          <input
            type="number"
            name="totalArea"
            value={propertyDetails.totalArea}
            onChange={handleChange}
            placeholder="Total Area (sq. ft.)"
            required
          />
        </div>

        {/* Section 3: Document Upload */}
        <div className="form-section">
          <h3>Document Upload</h3>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
            required
          />
        </div>

        {/* Section 4: Fire Safety Information */}
        <div className="form-section">
          <h3>Fire Safety Information</h3>
          <label>
            <input
              type="checkbox"
              name="fireExtinguishers"
              checked={fireSafety.fireExtinguishers}
              onChange={handleCheckboxChange}
            />{' '}
            Fire Extinguishers
          </label>
          <label>
            <input
              type="checkbox"
              name="fireAlarms"
              checked={fireSafety.fireAlarms}
              onChange={handleCheckboxChange}
            />{' '}
            Fire Alarms
          </label>
          <input
            type="number"
            name="fireExits"
            value={fireSafety.fireExits}
            onChange={(e) =>
              setFireSafety({ ...fireSafety, fireExits: e.target.value })
            }
            placeholder="Number of Fire Exits"
            required
          />
        </div>

        {/* Section 5: Site Inspection */}
        <div className="form-section">
          <h3>Site Inspection</h3>
          <input
            type="date"
            value={preferredDate}
            onChange={(e) => setPreferredDate(e.target.value)}
            required
          />
        </div>

        <div className="form-buttons">
          <button type="submit">Submit Application</button>
          <button type="button">Save as Draft</button>
        </div>
      </form>
    </div>
  );
}

export default ApplyNOC;

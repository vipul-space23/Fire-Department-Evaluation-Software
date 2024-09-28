import React, { useState } from 'react';
import './CSS/noc.css'

function FireNOCForm() {
  const [formData, setFormData] = useState({
    buildingPlans: '',
    keyPlan: '',
    floorPlan: '',
    floorWiseFireFightingPlan: '',
    allFireFightingPlan: '',
    frontElevation: '',
    sideElevation: '',
    typicalFloorPlan: '',
    sitePlan: '',
    floorWisePlan: '',
    projectReport: '',
    buildingStabilityCertificate: '',
    architectureChecklistCertificate: '',
    addressProof: '',
    buildingPhotograph: '',
    electronicWiringCertificate: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file inputs
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    for (const key in formData) {
      formDataToSubmit.append(key, formData[key]);
    }

    // Here, you can send formDataToSubmit to your backend API
    console.log('Form submitted:', formDataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px', margin: 'auto' }}>
      <h2>Fire NOC Application Form</h2>

      <div>
        <label htmlFor="buildingPlans">Two copies of building plans:</label>
        <input
          type="file"
          id="buildingPlans"
          name="buildingPlans"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="keyPlan">Key Plan:</label>
        <input
          type="file"
          id="keyPlan"
          name="keyPlan"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="floorPlan">Floor Plan:</label>
        <input
          type="file"
          id="floorPlan"
          name="floorPlan"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="floorWiseFireFightingPlan">Floor Wise Fire Fighting Plan:</label>
        <input
          type="file"
          id="floorWiseFireFightingPlan"
          name="floorWiseFireFightingPlan"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="allFireFightingPlan">All Fire Fighting Plan:</label>
        <input
          type="file"
          id="allFireFightingPlan"
          name="allFireFightingPlan"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="frontElevation">Front Elevation:</label>
        <input
          type="file"
          id="frontElevation"
          name="frontElevation"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="sideElevation">Side Elevation:</label>
        <input
          type="file"
          id="sideElevation"
          name="sideElevation"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="typicalFloorPlan">Typical Floor Plan:</label>
        <input
          type="file"
          id="typicalFloorPlan"
          name="typicalFloorPlan"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="sitePlan">Site Plan:</label>
        <input
          type="file"
          id="sitePlan"
          name="sitePlan"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="floorWisePlan">Floor Wise Plan:</label>
        <input
          type="file"
          id="floorWisePlan"
          name="floorWisePlan"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="projectReport">Project Report:</label>
        <input
          type="file"
          id="projectReport"
          name="projectReport"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="buildingStabilityCertificate">Building Stability Certificate:</label>
        <input
          type="file"
          id="buildingStabilityCertificate"
          name="buildingStabilityCertificate"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="architectureChecklistCertificate">Architecture Checklist Certificate:</label>
        <input
          type="file"
          id="architectureChecklistCertificate"
          name="architectureChecklistCertificate"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="addressProof">Address Proof:</label>
        <input
          type="file"
          id="addressProof"
          name="addressProof"
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="buildingPhotograph">Building Photograph:</label>
        <input
          type="file"
          id="buildingPhotograph"
          name="buildingPhotograph"
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="electronicWiringCertificate">Electronic Wiring Certificate:</label>
        <input
          type="file"
          id="electronicWiringCertificate"
          name="electronicWiringCertificate"
          onChange={handleChange}
        />
      </div>

      <button type="submit" style={{ marginTop: '20px' }}>Submit</button>
    </form>
  );
}

export default FireNOCForm;

import React, { useState } from 'react';
import './CSS/Reports.css';

function Reports() {
    const [formData, setFormData] = useState({
        buildingName: '',
        inspectionDate: '',
        inspectorName: '',
        fireExtinguishers: '1',  // Default Yes
        fireAlarmCondition: '1',  // Default Functional
        exitCondition: '3',  // Default rating
        commentsExtinguishers: '',
        commentsAlarms: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/generate_report', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'fire_safety_report.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            } else {
                console.error('Failed to generate report');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="report-container">
            <h2>Fire Safety Inspection Report</h2>
            <form onSubmit={handleSubmit} className="report-form">
                <label>
                    Building Name:
                    <input
                        type="text"
                        name="buildingName"
                        value={formData.buildingName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Inspection Date:
                    <input
                        type="date"
                        name="inspectionDate"
                        value={formData.inspectionDate}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Inspector Name:
                    <input
                        type="text"
                        name="inspectorName"
                        value={formData.inspectorName}
                        onChange={handleChange}
                        required
                    />
                </label>
                <label>
                    Fire Extinguishers Functional:
                    <select
                        name="fireExtinguishers"
                        value={formData.fireExtinguishers}
                        onChange={handleChange}
                    >
                        <option value="1">Yes</option>
                        <option value="0">No</option>
                    </select>
                </label>
                <label>
                    Fire Alarm Condition:
                    <select
                        name="fireAlarmCondition"
                        value={formData.fireAlarmCondition}
                        onChange={handleChange}
                    >
                        <option value="1">Functional</option>
                        <option value="0">Non-Functional</option>
                    </select>
                </label>
                <label>
                    Exit Condition (1-5):
                    <input
                        type="number"
                        name="exitCondition"
                        value={formData.exitCondition}
                        min="1"
                        max="5"
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Comments on Extinguishers:
                    <textarea
                        name="commentsExtinguishers"
                        value={formData.commentsExtinguishers}
                        onChange={handleChange}
                    />
                </label>
                <label>
                    Comments on Alarms:
                    <textarea
                        name="commentsAlarms"
                        value={formData.commentsAlarms}
                        onChange={handleChange}
                    />
                </label>
                <button type="submit">Generate Report</button>
            </form>
        </div>
    );
}

export default Reports;

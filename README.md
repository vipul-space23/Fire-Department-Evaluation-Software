# Fire Department Evaluation  System

## Features

- **Application Processing**: Manage inspection requests, schedules, and follow-up statuses.
- **Interactive Dashboard**: User-friendly web interface for department officials to monitor progress and take actions.
- **NOC Issuance**: Track and manage the status of NOC issuance.
- **Reports & Analytics**: Generate periodic reports and analytics on applications, inspections, and approvals.

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (React.js for interactive UI components)
- **Backend**: Node.js, Express.js (API handling and data management)
- **Database**: MongoDB
- **Other Tools**: 
  - **Version Control**: Git, GitHub

## Installation

To get started with the project locally, follow these steps:

### Prerequisites

- **Node.js** (v16+)
- **MongoDB/MySQL** (Depending on your database choice)
- **Git**
### Implementation of GEN AI :
- **Automated Report Generation**: 
Our Automated Report Generation feature allows admins to generate detailed fire safety inspection reports based on the inputs they provide. This feature streamlines the process by automatically creating comprehensive reports, saving time and reducing manual effort.

How It Works
Input Form: Admins can input key details such as:

Building name
Inspection date
Inspector's name
Fire extinguisher functionality
Fire alarm condition
Exit condition rating
Additional comments on fire extinguishers and alarms
AI-Powered Report Generation:

Once the form is submitted, the data is processed and sent to the backend, where an AI model generates a detailed fire safety inspection report in PDF format.
The report includes the provided inputs, any flagged issues, and a professional summary of the building's safety status.
Downloadable Report:

The generated report is automatically downloaded as a PDF, ready for distribution or archiving.
Benefits
Efficiency: Automatically generates a structured report with minimal admin input.
Accuracy: Ensures all key fire safety details are captured, reducing the risk of human error.
Simplicity: Easy-to-use form that allows admins to quickly generate reports without technical expertise.

### Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-repository/fire-department-evaluation-software.git

cd fire-department-evaluation-software
npm install

DB_CONNECTION=mongodb://localhost:27017/fire_department
PORT=3000

npm start



   

// conductor.js


const { ConductorClient } = require('@conductor-sdk/conductor-typescript');
require('dotenv').config();  // To load the .env variables

// Initialize Conductor client
const client = new ConductorClient({
    serverUrl: process.env.CONDUCTOR_SERVER_URL,
    apiKey: process.env.CONDUCTOR_API_KEY
});

// Example workflow task
async function createAndRunWorkflow() {
    try {
        // Define a simple workflow (you can expand this as needed)
        const workflowName = 'FireDept-Noc-Workflow';  // Your workflow name
        const inputData = {};  // Input data for your workflow

        // Start the workflow
        const workflowId = await client.workflow.startWorkflow(workflowName, inputData);
        console.log(`Workflow started with ID: ${workflowId}`);
    } catch (error) {
        console.error("Error starting workflow:", error);
    }
}

// Call the function to start the workflow
createAndRunWorkflow();

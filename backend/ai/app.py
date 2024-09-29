import os
import google.generativeai as genai
from flask import Flask, render_template, request, send_file
from flask_cors import CORS  # Import flask_cors to handle CORS
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from datetime import datetime

app = Flask(__name__)

# Enable CORS for all routes
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Configure the API key
genai.configure(api_key="AIzaSyDXTiguL-_iLS0QF0zJJ59Ir646GF5eVrE")

# Create the model
generation_config = {
    "temperature": 0.7,
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_report', methods=['POST'])
def generate_report():
    # Parse the form data sent from React
    data = request.json
    user_responses = {
        "building_name": data['buildingName'],
        "inspection_date": data['inspectionDate'],
        "inspector_name": data['inspectorName'],
        "fire_extinguishers": data['fireExtinguishers'],
        "fire_alarm_condition": data['fireAlarmCondition'],
        "exit_condition": data['exitCondition'],
        "comments_extinguishers": data['commentsExtinguishers'],
        "comments_alarms": data['commentsAlarms'],
    }

    # Generate report request
    report_request = (
        f"Generate a fire safety inspection report based on the following checklist:\n\n"
        f"**Building Name:** {user_responses['building_name']}\n"
        f"**Inspection Date:** {user_responses['inspection_date']}\n"
        f"**Inspector Name:** {user_responses['inspector_name']}\n\n"
        f"**Fire extinguishers present:** {'Yes' if user_responses['fire_extinguishers'] == '1' else 'No'}\n"
        f"**Fire alarm condition:** {['Functional', 'Partially Functional', 'Non-Functional'][int(user_responses['fire_alarm_condition']) - 1]}\n"
        f"**Overall condition of exits:** {user_responses['exit_condition']}\n"
        f"**Comments on fire extinguishers:** {user_responses['comments_extinguishers']}\n"
        f"**Comments on fire alarms:** {user_responses['comments_alarms']}\n\n"
        f"Please include:\n1. Inspection Summary\n2. Detailed Findings\n3. Risk Assessment\n4. Next Step"
    )

    # Start a new chat session
    chat_session = model.start_chat()

    # Send the request to the model
    response = chat_session.send_message(report_request)

    # Print the generated report
    report_output = response.text
    print(f'Report Generated:\n{report_output}')

    # Create a PDF of the report
    pdf_file = create_pdf(report_output, user_responses['building_name'])

    return send_file(pdf_file, as_attachment=False)

def create_pdf(report_output, building_name):
    # Use timestamp in filename to avoid overwriting
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    pdf_file = f"fire_safety_inspection_report_{building_name}_{timestamp}.pdf"
    
    c = canvas.Canvas(pdf_file, pagesize=letter)
    width, height = letter

    # Title
    c.setFont("Helvetica-Bold", 16)
    c.drawString(100, height - 50, "Fire Safety Inspection Report")

    # Add report content
    c.setFont("Helvetica", 12)
    lines = report_output.split('\n')
    y = height - 80
    for line in lines:
        # Replace Markdown-like formatting with proper formatting
        line = line.replace('**', '').replace('*', '•').replace('#', '')
        c.drawString(100, y, line)
        y -= 20  # Move down for the next line

    c.save()
    print(f"PDF report generated: {pdf_file}")
    return pdf_file

if __name__ == '__main__':
    app.run(debug=True)

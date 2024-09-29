import os
import time
import google.generativeai as genai
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas

# Configure the API key
api_key = os.getenv("GOOGLE_API_KEY")  # Set this in your environment
genai.configure(api_key=api_key)

# Create the model
generation_config = {
    "temperature": 0.7,  # Adjusted for more varied responses
    "top_p": 0.95,
    "top_k": 40,
    "max_output_tokens": 8192,
    "response_mime_type": "text/plain",
}

model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

# Function to gather user input
def gather_input():
    # Gather building details
    building_name = input("Enter Building Name: ")
    inspection_date = input("Enter Inspection Date (e.g., 2024-09-29): ")
    inspector_name = input("Enter Inspector Name: ")

    while True:
        fire_extinguishers = input("Are fire extinguishers present? (1: Yes, 2: No): ").strip()
        if fire_extinguishers in ['1', '2']:
            break
        print("Invalid input. Please enter 1 for Yes or 2 for No.")
    
    while True:
        fire_alarm_condition = input("Condition of fire alarms? (1: Functional, 2: Partially Functional, 3: Non-Functional): ").strip()
        if fire_alarm_condition in ['1', '2', '3']:
            break
        print("Invalid input. Please enter 1, 2, or 3.")
    
    while True:
        exit_condition = input("Rate the overall condition of exits (1-5): ").strip()
        if exit_condition.isdigit() and 1 <= int(exit_condition) <= 5:
            break
        print("Invalid input. Please enter a number between 1 and 5.")
    
    comments_extinguishers = input("Comments for fire extinguishers: ")
    comments_alarms = input("Comments for fire alarms: ")

    return {
        "building_name": building_name,
        "inspection_date": inspection_date,
        "inspector_name": inspector_name,
        "fire_extinguishers": fire_extinguishers,
        "fire_alarm_condition": fire_alarm_condition,
        "exit_condition": exit_condition,
        "comments_extinguishers": comments_extinguishers,
        "comments_alarms": comments_alarms
    }

# Function to create a PDF report
def create_pdf(report_output):
    timestamp = time.strftime("%Y%m%d-%H%M%S")  # Format: YYYYMMDD-HHMMSS
    pdf_file = f"fire_safety_inspection_report_{timestamp}.pdf"  # Unique filename
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
        c.drawString(100, y, line)
        y -= 20  # Move down for the next line

    c.save()
    print(f"PDF report generated: {pdf_file}")

# Gather user input
user_responses = gather_input()

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
try:
    response = chat_session.send_message(report_request)
    # Print the generated report
    report_output = response.text
    print(f'Report Generated:\n{report_output}')

    # Create a PDF of the report
    create_pdf(report_output)

except Exception as e:
    print(f"Error generating report: {e}")

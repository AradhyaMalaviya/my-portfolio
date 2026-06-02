import os
import resend
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, change this to your actual domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set the Resend API Key (Ideally, use os.getenv("RESEND_API_KEY") in production)
resend.api_key = "re_cxNr7UX1_4y8e3ECB5KJ8ZGCd2b2CWPvc"

class ContactForm(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
async def send_contact_email(form: ContactForm):
    try:
        # Construct the email parameters
        params = {
            "from": "onboarding@resend.dev", # Or your verified domain, e.g., contact@aaradhya.dev
            "to": ["aaradhya.malaviya2005@gmail.com"],
            "subject": f"New Portfolio Message from {form.name}",
            "html": f"""
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> {form.name}</p>
            <p><strong>Email:</strong> {form.email}</p>
            <p><strong>Message:</strong></p>
            <p>{form.message}</p>
            """,
            "reply_to": form.email
        }
        
        # Send the email
        email = resend.Emails.send(params)
        
        return {"status": "success", "message": "Email sent successfully", "id": email["id"]}
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")

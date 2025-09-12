from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
import httpx


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class ContactFormData(BaseModel):
    name: str
    phone: str
    businessName: str
    comment: Optional[str] = ""

class ContactFormResponse(BaseModel):
    id: str
    name: str
    phone: str
    businessName: str
    comment: str
    timestamp: datetime
    status: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

@api_router.post("/contact-form", response_model=ContactFormResponse)
async def submit_contact_form(form_data: ContactFormData):
    try:
        # Create form submission record
        submission = {
            "id": str(uuid.uuid4()),
            "name": form_data.name,
            "phone": form_data.phone,
            "businessName": form_data.businessName,
            "comment": form_data.comment,
            "timestamp": datetime.utcnow(),
            "status": "received"
        }
        
        # Save to MongoDB
        await db.contact_forms.insert_one(submission)
        
        # Send Telegram notification if bot token is configured
        telegram_token = os.getenv('TELEGRAM_BOT_TOKEN')
        admin_chat_id = os.getenv('TELEGRAM_ADMIN_CHAT_ID')
        
        if telegram_token and admin_chat_id:
            try:
                await send_telegram_notification(form_data, telegram_token, admin_chat_id)
                submission["status"] = "sent_to_telegram"
                await db.contact_forms.update_one(
                    {"id": submission["id"]}, 
                    {"$set": {"status": "sent_to_telegram"}}
                )
            except Exception as e:
                logger.error(f"Failed to send Telegram notification: {e}")
                submission["status"] = "telegram_failed"
                await db.contact_forms.update_one(
                    {"id": submission["id"]}, 
                    {"$set": {"status": "telegram_failed", "telegram_error": str(e)}}
                )
        
        return ContactFormResponse(**submission)
        
    except Exception as e:
        logger.error(f"Error processing contact form: {e}")
        raise HTTPException(status_code=500, detail="Ошибка при обработке заявки")

async def send_telegram_notification(form_data: ContactFormData, bot_token: str, chat_id: str):
    """Send formatted notification to Telegram"""
    
    # Format message with proper escaping for MarkdownV2
    current_time = datetime.now().strftime('%d\\.%m\\.%Y %H:%M')
    message = f"""
🔔 *Новая заявка с сайта StataBots\\!*

👤 *Имя:* {escape_markdown_v2(form_data.name)}
📞 *Телефон:* {escape_markdown_v2(form_data.phone)}  
🏢 *Салон:* {escape_markdown_v2(form_data.businessName)}
💬 *Комментарий:* {escape_markdown_v2(form_data.comment or "Не указан")}

📅 *Время:* {current_time}

🚀 *Следующие шаги:*
• Свяжитесь с клиентом в течение 1 часа
• Проведите консультацию
• Предложите тестовый период
"""

    url = f"https://api.telegram.org/bot{bot_token}/sendMessage"
    
    async with httpx.AsyncClient() as client:
        response = await client.post(url, json={
            "chat_id": chat_id,
            "text": message,
            "parse_mode": "MarkdownV2"
        })
        
        if response.status_code != 200:
            raise Exception(f"Telegram API error: {response.text}")

def escape_markdown_v2(text: str) -> str:
    """Escape special characters for MarkdownV2"""
    if not text:
        return ""
    
    special_chars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!']
    for char in special_chars:
        text = text.replace(char, f'\\{char}')
    return text

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

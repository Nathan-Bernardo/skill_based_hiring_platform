import uvicorn
from pymongo import MongoClient
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
import json
from motor.motor_asyncio import AsyncIOMotorClient
from app.resume_parser import router as candidate_information_router
from app.ResumeParser.routers import router as candidate_router
from config import settings
import os 

save_path = "/home/ncbernar/Github/listeedemo/backend/app/resumes/"

app = FastAPI()

origins = [
    "http://localhost:3000",
    "localhost:3000"
]


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.on_event("startup")
async def start_db_client():
    app.mongodb_client = AsyncIOMotorClient(
        "mongodb+srv://ncbernar:Asianboy1998!@cluster0.eeofb.mongodb.net/profileDatabase?retryWrites=true&w=majority")
    app.mongodb = app.mongodb_client["Profile"]


@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()


@app.post("/resume/")
async def receive_file(file: UploadFile = File(...)):
    contents = await file.read()
    with open(f"/home/ncbernar/Github/listeedemo/backend/app/resumes/{file.filename}", "wb") as f:
        f.write(contents)
    print(file.content_type)
    print(file.filename)
    return {"filename": file.filename}


@app.get("/")
async def root():
    return {"message": "Welcome to Listee"}

app.include_router(candidate_router, tags=[
    "candidates"], prefix="/candidates")

app.include_router(candidate_information_router, tags=[
                   "candidates_information"], prefix="/candidate")

if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.HOST,
                port=settings.PORT, reload=True)

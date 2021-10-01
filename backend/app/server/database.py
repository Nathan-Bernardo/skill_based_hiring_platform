from datetime import datetime
from typing import List, Optional
from pydantic import BaseModel, EmailStr, Field
from pymongo import MongoClient
from pprint import pprint

client = MongoClient(
    "mongodb+srv://ncbernar:Asianboy1998!@cluster0.eeofb.mongodb.net/profileDatabase?retryWrites=true&w=majority")

db = client["ListeeProfiles"]


class CandidateSchema(BaseModel):
    firstname: str = None
    lastname: str = None
    email: EmailStr = None
    phone: str = None
    experiences: List[str] = []
    skills: List[str] = []


external_data = {
    "firstname": "Nathan",
    "lastname": "Bernardo",
    "email": "nathan@gmail.com",
    "phone": "4083937534",
    "experiences": [
        "Worked as a cashier at ASICS",
        "Sanitation engineer at Apple",
        "Used Redux for managing the states in the frontend",
    ],
    "skills": [
        "Python",
        "MongoDB",
        "PostgreSQL",
        "Communicaton",
        "HTML",
    ]

}

candidate = CandidateSchema(**external_data)

candidate1 = {
    "firstname": "Nathan",
    "lastname": "Bernardo",
    "email": "nathan@gmail.com",
    "phone": "4083937534",
    "experiences": [
        "Worked as a cashier at ASICS",
        "Sanitation engineer at Apple",
        "Used Redux for managing the states in the frontend",
    ],
    "skills": [
        "Python",
        "MongoDB",
        "PostgreSQL",
        "Communicaton",
        "HTML",
    ]
}

candidate2 = {
    "firstname": "Comic",
    "lastname": "San",
    "email": "papyrus@gmail.com",
    "phone": "4083937534",
    "experiences": [
        "Desired Avatar's title with papyrus",
        "Director for Home Alone",
        "Plagiarized my own essay",
    ],
    "skills": [
        "HTML",
        "Node.js",
        "React",
        "Stealing",
        "Public speaking",
    ]
}

# CREATE/SPECIFY COLLECTION TO STORE DATA
candidates = db.candidateProfiles
# result2 = candidates.insert_one(candidate2)

result = candidates.insert_one(candidate1)

# PRINT ALL PROFILES
candidate_find = candidates.find()
for profile in candidate_find:
    pprint(profile)

# PRINT ONE FILE WITH SPECIFIC ELEMENTS
pprint(candidates.find_one({"firstname": "Nathan"}))
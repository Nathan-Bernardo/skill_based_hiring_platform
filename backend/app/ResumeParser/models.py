import uuid
from typing import Optional, List
from pydantic import BaseModel, Field


class CandidateModel(BaseModel):
    id: str = Field(default_factory=uuid.uuid4, alias="_id")
    name: str = Field(...)
    email: str = Field(...)
    skills: List[str]

    class Config:
        schema_extra = {
            "example": {
                "id": "64516637-0019-4b1c-8b96-b58bc22e48e4",
                "name": "Nathan Bernardo",
                "email": "nathan@listee.net",
                "skills": [
                    "python",
                    "javascript",
                    "react",
                    "typescript",
                    "pydantic",
                    "pytorch",
                ]
            }
        }


class UpdateCandidateModel(BaseModel):
    name: Optional[str]
    email: Optional[str]
    skills: Optional[List[str]]

    class Config:
        schema_extra = {
            "example": {
                "name": "Nathan Bernardo",
                "email": "nathan@listee.net",
                "skills": [
                    "python",
                    "javascript",
                    "react",
                    "typescript",
                    "pydantic",
                    "pytorch",
                    "tensorflow",
                    "mongodb",
                    "distributed systems",
                ]
            }
        }

from typing import Optional

from pydantic import BaseModel, EmailStr, Field


class CandidateSchema(BaseModel):
    firstname: str = Field(...)
    lastname: str = Field(...)
    email: EmailStr = Field(...)
    phone: str = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "firstname": "Nathan",
                "lastname": "Bernardo",
                "email": "nathan@gmail.com",
                "phone": "(408)393-7534",
            }
        }


class UpdateCandidateModel(BaseModel):
    firstname: Optional[str] = Field(...)
    lastname: Optional[str] = Field(...)
    email: Optional[EmailStr] = Field(...)
    phone: Optional[str] = Field(...)

    class Config:
        schema_extra = {
            "example": {
                "firstname": "Naten",
                "lastname": "Berenstein",
                "email": "nathan@gmail.com",
                "phone": "(408)393-7534"
            }
        }


def ResponseModel(data, message):
    return {
        "data": [data],
        "code": 200,
        "message": message,
    }


def ErrorResponseModel(error, code, message):
    return {"error": error, "code": code, "message": message}

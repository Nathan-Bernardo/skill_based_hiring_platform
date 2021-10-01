from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder


from server.database import (
    add_candidate,
    delete_candidate,
    retrieve_candidate,
    retrieve_candidates,
    update_candidate,
)
from server.models.candidate import (
    ErrorResponseModel,
    ResponseModel,
    CandidateSchema,
    UpdateCandidateModel,
)

router = APIRouter()


@router.post("/", response_description="Candidate data added into the database")
async def add_candidate_data(candidate: CandidateSchema = Body(...)):
    candidate = jsonable_encoder(candidate)
    new_candidate = await add_candidate(candidate)
    return ResponseModel(new_candidate, "Candidate added successfully.")


@router.get("/", response_description="Candidate retrieved")
async def get_candidates():
    candidates = await retrieve_candidates()
    if candidates:
        return ResponseModel(candidates, "Candidate data retrieved successfully")
    return ResponseModel(candidates, "Empty list returned")


@router.get("/{id}", response_description="Candidate data retrieved")
async def get_candidate_data(id):
    Candidate = await retrieve_Candidate(id)
    if Candidate:
        return ResponseModel(Candidate, "Candidate data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "Candidate doesn't exist.")


# @router.put("/{id}")
# async def update_candidate_data(id: str, req: UpdateCandidateModel = Body(...)):
#     req = {k: v for k, v in req.dict().items() of v is not None}
#     updated_candidate = awai update_candidate(id, req)

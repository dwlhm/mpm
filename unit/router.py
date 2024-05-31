from fastapi import APIRouter, Depends
from typing import Annotated

from dependencies import oauth2_scheme

router = APIRouter(
    prefix="/units",
    tags=["Unit"],
    dependencies=[Depends(oauth2_scheme)]
)

@router.get("/")
async def get_all_unit(token: str = Depends(oauth2_scheme)):
    print("token: ", token)
    return {
        "status": "success",
        "results": "data"
    }
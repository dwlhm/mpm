from fastapi import APIRouter, Depends, HTTPException
from typing import Literal
from .db import get_data
from dependencies import oauth2_scheme
from configuration.config import load_config

router = APIRouter(
    prefix="/data",
    tags=["Data"],
    dependencies=[Depends(oauth2_scheme)]
)

# @router.get("/{id}")
# async def get_data_with_filter(id: str, mode: Literal["hourly", "daily", "weekly", "monthly", "yearly"]):
#     result = get_data(
#         mode_id=mode,
#         id=id,
#         config=load_config()
#     )
#     if (result.get("error")): raise HTTPException(
#             status_code=400,
#             detail=result.get("error")
#         )
#     return {
#         "status": "success",
#         "results": result.get("data")
#     }
from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from pydantic import BaseModel
import base64

from dependencies import oauth2_scheme
from configuration.config import load_config
from .db import get_all, new, get_by_id, update, remove


router = APIRouter(
    prefix="/kampus",
    tags=["Kampus"],
    dependencies=[Depends(oauth2_scheme)]
)

class Kampus(BaseModel):
    name: str

@router.get("/")
async def get_all_unit(token: str = Depends(oauth2_scheme)):
    result = get_all(load_config())
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )
    return {
        "status": "success",
        "results": result.get("data")
    }

@router.get("/{id}")
async def get_kampus(id: str):
    result = get_by_id(id, load_config())
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )
    return {
        "status": "success",
        "results": result.get("data")
    }

@router.post("/")
async def insert_kampus(kampus: Kampus):
    result = new(kampus.name, load_config())
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )
    return {
        "status": "success",
        "data": {
            "id": base64.b64encode(str(result.get("data")).encode()).decode(),
            "name": kampus.name
        }
    }

@router.put("/{id}")
async def update_kampus(id: str, kampus: Kampus):
    result = update(kampus.name, id, load_config())
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )
    return {
        "status": "success",
        "data": {
            "id": id,
            "name": kampus.name
        }
    }

@router.delete("/{id}")
async def delete_kampus(id: str):
    result = remove(id, load_config())
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )
    return {
        "status": "success",
        "data": {
            "message": "Kampus berhasil dihapus"
        }
    }
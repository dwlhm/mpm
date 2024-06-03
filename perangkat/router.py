from fastapi import APIRouter, Depends, HTTPException
from typing import Annotated
from pydantic import BaseModel
import base64

from dependencies import oauth2_scheme
from configuration.config import load_config
from .db import get_all, new, get_by_id, update, remove


router = APIRouter(
    prefix="/perangkat",
    tags=["Perangkat"],
    dependencies=[Depends(oauth2_scheme)]
)

class Perangkat(BaseModel):
    name: str
    gedung: str
    ip_addr: str
    port: int
    power_meter: str

@router.get("/")
async def get_all_perangkat(token: str = Depends(oauth2_scheme)):
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
async def get_perangkat(id: str):
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
async def insert_perangkat(perangkat: Perangkat):
    result = new(
        name=perangkat.name, 
        gedung_id=perangkat.gedung, 
        ip_addr=perangkat.ip_addr,
        port=perangkat.port,
        power_meter_id=perangkat.power_meter,
        config=load_config()
    )
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )
    return {
        "status": "success",
        "data": {
            "id": base64.b64encode(str(result.get("data")).encode()).decode(),
            "name": perangkat.name,
            "gedung_id": perangkat.gedung,
            "ip_addr": perangkat.ip_addr,
            "port": perangkat.port,
            "power_meter_id": perangkat.power_meter
        }
    }

@router.put("/{id}")
async def update_gedung(id: str, perangkat: Perangkat):
    result = update(
        name=perangkat.name, 
        gedung_id=perangkat.gedung, 
        ip_addr=perangkat.ip_addr,
        port=perangkat.port,
        power_meter_id=perangkat.power_meter,
        id=id,
        config=load_config()
    )
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )
    return {
        "status": "success",
        "data": {
            "id": id,
            "name": perangkat.name,
            "gedung_id": perangkat.gedung,
            "ip_addr": perangkat.ip_addr,
            "port": perangkat.port,
            "power_meter_id": perangkat.power_meter
        }
    }

@router.delete("/{id}")
async def delete_gedung(id: str):
    result = remove(id, load_config())
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )
    return {
        "status": "success",
        "data": {
            "message": "Perangkat berhasil dihapus"
        }
    }
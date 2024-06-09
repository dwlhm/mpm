from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from pydantic import BaseModel
from dependencies import oauth2_scheme
from .db import get, new, update, remove, get_by_id
from configuration.config import load_config

router = APIRouter(
    prefix="/powermeter",
    tags=["Powermeter Register"],
    dependencies=[Depends(oauth2_scheme)]
)

class PowermeterRegister(BaseModel):
    register: str 

@router.post("/{id}/register")
async def new_register(id: str, pmRegister: PowermeterRegister):
    print("ereew",id)
    result = new(id, pmRegister.register, load_config())

    if result.get('error'):
        raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )

    return {
        "status": "success",
        "results": result.get('data')
    }

@router.get("/{id}/register")
async def get_register_by_id(id: str):
    result = get_by_id(id, load_config())

    if result.get('error'):
        raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )

    return {
        "status": "success",
        "results": result.get('data')
    }


@router.put("/{id}/register")
async def update_register(id: str, pmReg: PowermeterRegister):
    result = update(id=id, powermeter_id=pmReg.powermeter_id, register=pmReg.register, config=load_config())

    if result.get("error"):
        raise HTTPException(
                status_code=400,
                detail=result.get("error")
                )

    return {
        "status": "success",
        "results": result.get("data")
    }

@router.delete("/{id}/register")
async def delete_register(id: str):
    result = remove(id, load_config())

    if result.get("error"):
        raise HTTPException(
                status_code=400,
                detail=result.get("error")
                )

    return {
        "status": "success",
        "results": result.get("data")
    }



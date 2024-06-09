from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from dependencies import oauth2_scheme
from .db import get, new, update, remove, get_by_id
from configuration.config import load_config

router = APIRouter(
    prefix="/powermeter/register",
    tags=["Powermeter Register"],
    dependencies=[Depends(oauth2_scheme)]
)

@router.get("/")
async def get_register():
    result = get(load_config())

    if result.get("error"):
        raise HTTPException(
                status_code=400,
                detail=result.get("error")
                )
    return {
        "status": "success",
        "results": result.get("data")
    }

class PowermeterRegister(BaseModel):
    powermeter_id: str
    register: str 

@router.post("/")
async def new_register(pmRegister: PowermeterRegister):
    result = new(pmRegister.powermeter_id, pmRegister.register, load_config())

    if result.get('error'):
        raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )

    return {
        "status": "success",
        "results": result.get('data')
    }

@router.get("/{id}")
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


@router.put("/{id}")
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

@router.delete("/{id}")
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



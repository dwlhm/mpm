from datetime import datetime, timedelta, timezone
from typing import Union, Annotated

from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from passlib.context import CryptContext
from jose import JWTError, jwt
import base64

import user.auth.router as auth
import user.router as user
import powermeter.router as powermeter
import kampus.router as kampus
import unit.router as unit
import gedung.router as gedung
import device.router as device

from configuration.config import load_config
import database.get as get
import database.insert as insert
import database.delete as delete
import database.update as update
from device_registers.registers_repo import repo as registers

config = load_config()

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:4173",
    "https://simaung.unsil.ac.id",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(user.router)
app.include_router(powermeter.router)
app.include_router(kampus.router)
app.include_router(unit.router)
app.include_router(gedung.router)
app.include_router(device.router)

# @app.get("/")
# def read_root():
# 	return {"Hello": "World"}



# @app.get("/devices")
# def read_all_device_ip(token: Annotated[str, Depends(oauth2_scheme)]):
#     data = get.get_all_devices_ip()
#     if data.get("error"):
#         raise HTTPException(
#             status_code=500,
#             detail="database connection error"
#         )
#     if data.get("data") == []:
#         raise HTTPException(
#             status_code=404,
#             detail="no data"
#         )
    
#     result = []
    
#     for data in data.get("data"):
#         lst = list(data)
#         lst[2] = base64.b64encode(str(data[2]).encode()).decode("utf-8")
#         result.append(tuple(lst))

#     return {"status": "success", "results": {"data": result}}

# class Device(BaseModel):
# 	name: str
# 	ip_addr: str
# 	seri: str = Field(default="AW9L")

# @app.post("/devices")
# def insert_new_device(device: Device, token: Annotated[str, Depends(oauth2_scheme)]):
# 	data = insert.insert_device(device.name, device.ip_addr, device.seri)
# 	return {"status": "success", "results": base64.b64encode(str(data).encode)}

# @app.get("/devices/{device_id}")
# def read_device_info(device_id: str, token: Annotated[str, Depends(oauth2_scheme)]):
#     device_id = base64.b64decode(device_id).decode("utf-8")
#     data = get.get_device(device_id)
	
#     return {"status": "success", "results": data}

# @app.put("/devices/{device_id}")
# def update_device_info(device_id: str, device: Device, token: Annotated[str, Depends(oauth2_scheme)]):
#     data = update.update_device_detail(
#           device_id=device_id, 
#           device_name=device.name,
#           device_ip=device.ip_addr
#         )
    
#     if data.get("error"):
#         raise HTTPException(
#             status_code=500,
#             detail="database connection error"
#         )
    
#     return {
#          "status": "success",
#          "results": data
#     } 

# @app.delete("/devices/{device_id}")
# def remove_device_by_id(device_id: str, token: Annotated[str, Depends(oauth2_scheme)]):
#     device_id = base64.b64decode(device_id).decode("utf-8")
#     data = delete.remove_device(device_id)
#     return {"status": "success", "results": data}

# @app.get("/devices/{device_id}/latest")
# def read_device_data(device_id: str, token: Annotated[str, Depends(oauth2_scheme)]):
#     device_id = base64.b64decode(device_id).decode("utf-8")
#     data = get.get_data_latest(device_id)
    
#     if data == None:
#         raise HTTPException(
#             status_code=404,
#             detail="no data"
#         )

#     return {"status": "success", "results": {
#         "data": data[0],
#         "timestamp": data[1]
#     }}

# @app.post("/devices/{device_id}/latest")
# def insert_dummy_data(device_id: str, data: str, token: Annotated[str, Depends(oauth2_scheme)]):
#     device_id = base64.b64decode(device_id).decode("utf-8")
#     insert.insert_data(device_id, data)

#     return { "status": "success" }

# @app.get("/datasheet/{seri}")
# def get_datasheet(seri: str, token: Annotated[str, Depends(oauth2_scheme)]):
#     return { "status": "success", "results": registers[seri]}

# # powermeter CRUD
# class PowerMeter(BaseModel):
#     seri: str
#     brand: str

# @app.post("/powermeter")
# async def insert_powermeter(pm: PowerMeter, token: Annotated[str, Depends(oauth2_scheme)]):
#     res = powermeter.new(
#         pbrand=pm.brand,
#         pseri=pm.seri,
#         config=config
#     )

#     if (res.get("error")):
#         raise HTTPException(
#             status_code=400,
#             detail=res.get("error")
#         )
    
#     return {
#         "status": "success",
#         "results": {
#             "id": base64.b64encode(str(res.get("data")).encode()).decode(),
#             "seri": pm.seri,
#             "brand": pm.brand    
#         }
#     }

# @app.get("/powermeter")
# async def get_all_powermeter(token: Annotated[str, Depends(oauth2_scheme)]):
#     res = powermeter.get_all(config)

#     if (res.get("error")):
#         raise HTTPException(
#             status_code=400,
#             detail=res.get("error")
#         )
    
#     return {
#         "status": "success",
#         "results": res.get("data")
#     }

# @app.get("/powermeter/{id}")
# async def get_powermeter_by_id(id: str, token: Annotated[str, Depends(oauth2_scheme)]):
#     id = base64.b64decode(id).decode()
#     res = powermeter.get_one(id=id,config=config)

#     if (res.get("error")):
#         raise HTTPException(
#             status_code=400,
#             detail=str(res.get("error"))
#         )
    
#     return {
#         "status": "success",
#         "results": res.get("data")
#     }

# @app.put("/powermeter/{id}")
# async def update_powermeter(id: str, pm: PowerMeter, token: Annotated[str, Depends(oauth2_scheme)]):
#     id = base64.b64decode(id).decode()
#     res = powermeter.update(
#         id=id,
#         pseri=pm.seri,
#         pbrand=pm.brand,
#         config=config
#     )

#     if (res.get("error")):
#         raise HTTPException(
#             status_code=400,
#             detail=str(res.get("error"))
#         )
    
#     return {
#         "status": "success",
#         "results": res.get("data")
#     }

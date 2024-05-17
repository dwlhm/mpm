from typing import Annotated

from fastapi import Depends, FastAPI
from fastapi.security import OAuth2PasswordBearer
from pydantic import BaseModel

import database.get as get
import database.insert as insert
import database.delete as delete
from device_registers.registers_repo import repo as registers

app = FastAPI()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

@app.get("/")
def read_root():
	return {"Hello": "World"}

@app.get("/devices")
def read_all_device_ip(token: Annotated[str, Depends(oauth2_scheme)]):
	data = get.get_all_devices_ip()
	return {"status": "success", "results": data}

class Device(BaseModel):
	name: str
	ip_addr: str
	seri: str

@app.post("/devices")
def insert_new_device(device: Device, token: Annotated[str, Depends(oauth2_scheme)]):
	data = insert.insert_device(device.name, device.ip_addr, device.seri)
	return {"status": "success", "results": data}

@app.get("/devices/{device_id}")
def read_device_info(device_id: int, token: Annotated[str, Depends(oauth2_scheme)]):
	data = get.get_device(device_id)
	return {"status": "success", "results": data}

@app.delete("/devices/{device_id}")
def remove_device_by_id(device_id: str, token: Annotated[str, Depends(oauth2_scheme)]):
	data = delete.remove_device(device_id)
	return {"status": "success", "results": data}

@app.get("/devices/{device_id}/latest")
def read_device_data(device_id: str, token: Annotated[str, Depends(oauth2_scheme)]):
	data = get.get_data_latest(device_id)
	return {"status": "success", "results": data}

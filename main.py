from pymodbus.client import ModbusTcpClient
import time
import json
from fastapi import FastAPI
from pydantic import BaseModel

import database.get as get
import database.insert as insert
from device_registers.registers_repo import repo as registers

def scan_device(ip_addr, seri):
	client = ModbusTcpClient(host= ip_addr, retries = 5, no_resend_on_retry = False)   # Create client object
	client.connect()
	time.sleep(2)
	data = {}
	for register in registers[seri]:
		read(client, register, data)	                  
	client.close()  
	return json.dumps(data)

def read(client, register, data):
	rr = client.read_holding_registers(register[0], 2, slave=1)
	if rr.isError():
		# read()
		print(f"{register} ERROR: exception in pymodbus {rr}")
	else:
		data[register[2]] = rr.registers[0]
		#print(f"{register}: {rr.registers}")  

app = FastAPI()

@app.get("/")
def read_root():
	return {"Hello": "World"}

@app.get("/devices")
def read_all_device_ip():
	data = get.get_all_devices_ip()
	return {"status": "success", "results": data}

class Device(BaseModel):
	name: str
	ip_addr: str
	seri: str

@app.post("/devices")
def insert_new_device(device: Device):
	data = insert.insert_device(device.name, device.ip_addr, device.seri)
	return {"status": "success", "results": data}

@app.get("/devices/{device_id}")
def read_device_info(device_id: int):
	data = get.get_device(device_id)
	return {"status": "success", "results": data}

@app.get("/devices/{device_id}/latest")
def read_device_data(device_id: str):
	data = get.get_data_latest(device_id)
	return {"status": "success", "results": data}

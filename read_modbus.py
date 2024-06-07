from pymodbus.client import ModbusTcpClient
from datetime import datetime
from time import sleep
# from database.get import get_all_devices_ip
# from database.insert import insert_data
# from perangkat.db import insert_latest_data, get_all
# from perangkat.internal import DataPerangkat
# from device_registers.registers_repo import repo as registers
# from logger import logger

from configuration.config import load_config
from device.db import get_all
from device.internal import DataPerangkat
from device_registers.registers_repo import repo as registers

def scan_device(ip_addr: str, port: int, id: str, pm_seri: str):
	client = ModbusTcpClient(
		host= ip_addr, 
		retries = 5, 
		no_resend_on_retry = False
	)  
	conn = client.connect()
	if conn:
		print(f"connected to {ip_addr}:{port} with device_id: {id} [{pm_seri}]")
		data = []
		for index, register in enumerate(registers[pm_seri]):
			read(client, register, data, ip_addr, index)	  
			sleep                
		client.close()  
		# logger.info(f"close connection from {ip_addr}")
		# data_sensor: DataPerangkat
		# data_sensor["phase_voltage_a"] = "90"
		# print("data_sensor",data_sensor)
	else:
		return

def read(client, register, data, ip_addr, index):
	rr = client.read_holding_registers(register[0], 2, slave=1)
	if rr.isError():
		print(f"{register[0]} - exception in pymodbus {rr}")
	else:
		data.append(rr.registers[0]*register[1])
		print(f"reading register {register[0]} from {ip_addr}, value: {rr.registers[0]*register[1]} {register[3]}")
		
if __name__ == "__main__":
	#devices = get_all(load_config())
	#devices = devices.get("data")
	#print(devices)
	#for device in devices:
		#pm = device.get("powermeter")
		#seri = pm.get("name")
	scan_device(
		ip_addr="10.225.0.207",
		port=502,
		id="id",
		pm_seri="AW9L"
	)
	# while True:
	# 	for device in devices["data"]:
	# 		scan_device(device[0], device[1], device[2])

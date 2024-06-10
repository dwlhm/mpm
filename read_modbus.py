from pymodbus.client import ModbusTcpClient
from datetime import datetime
import threading
from time import sleep
from logger import logger

from configuration.config import load_config
from device.db import get_all, insert_latest_data
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
		data = {}
		for index, register in enumerate(registers[pm_seri]):  
			sleep(.3) 
			read(client, register, data, ip_addr, index)	              
		client.close() 
		print("data modbus", data) 
		result = insert_latest_data(
			id=id,
			timestamp=datetime.now(),
			config=load_config(),
			data=data
		)
		logger.info(f"Pembacaan PM {ip_addr} selesai")
		if result.get("error"): logger.info(f"Tidak dapat menyimpan data ke database: ", result.get("error"))
		if result.get("data"): logger.info(f"Data hasil pembacaan: ", data)
		logger.info(f"close connection from {ip_addr}")
	else:
		return

def read(client, register, data, ip_addr, index):
	rr = client.read_holding_registers(register[0], 2, slave=1)
	if rr.isError():
		logger.info(f"{register[0]} - exception in pymodbus {rr}")
	else:
		data[register[3]] = rr.registers[0]*register[1]
		logger.info(f"reading register {register[0]} from {ip_addr}, value: {rr.registers[0]*register[1]} {register[3]}")

def tFunc(device):
	print(device)
	pm = device.get("powermeter")
	pm_seri = pm.get("seri")
	scan_device(
		ip_addr=device.get("ip_addr"),
		port=device.get("port"),
		id=device.get("id"),
		pm_seri=pm_seri
	)
		
if __name__ == "__main__":
	devices = get_all(load_config())
	devices = devices.get("data")
	# while True:
	print(threading.active_count())
	for index, device in enumerate(devices):
		if (index <= 2):
			logger.info("Main    : create and start thread %d.", index)
			x = threading.Thread(target=tFunc, args=(device,))
			print(x.is_alive())
			if x.is_alive() != True:
				x.start()
			else: 
				print("Thread {index} is still alive")
	sleep(5)

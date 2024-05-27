from pymodbus.client import ModbusTcpClient
import time
import json
from database.get import get_all_devices_ip
from database.insert import insert_data
from device_registers.registers_repo import repo as registers
from logger import logger

def scan_device(ip_addr, seri, id):
	print("ip_addr", ip_addr)
	print("seri", seri)
	print("id", id)
	client = ModbusTcpClient(host= ip_addr, retries = 5, no_resend_on_retry = False)   # Create client object
	conn = client.connect()
	if conn:
		logger.info(f"connected to {ip_addr} with seri: {seri}")
		time.sleep(2)
		data = []
		for index, register in enumerate(registers[seri]):
			read(client, register, data, ip_addr, index)	                  
		client.close()  
		logger.info(f"close connection from {ip_addr}")
		insert_data(id, json.dumps(data))
	else:
		return

def read(client, register, data, ip_addr, index):
	rr = client.read_holding_registers(register[0], 2, slave=1)
	if rr.isError():
		logger.warning(f"{register} - exception in pymodbus {rr}")
	else:
		data.append([rr.registers[0]*register[1], index])
		logger.info(f"reading register {register[0]} from {ip_addr}, value: {rr.registers[0]*register[1]} {register[3]}")
		
if __name__ == "__main__":
	devices = get_all_devices_ip()
	print(devices["data"])
	while True:
		for device in devices["data"]:
			scan_device(device[0], device[1], device[2])
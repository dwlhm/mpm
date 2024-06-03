from pymodbus.client import ModbusTcpClient
from datetime import datetime
# from database.get import get_all_devices_ip
# from database.insert import insert_data
# from perangkat.db import insert_latest_data, get_all
# from perangkat.internal import DataPerangkat
# from device_registers.registers_repo import repo as registers
# from logger import logger

from configuration.config import load_config
from perangkat.db import get_all
from perangkat.internal import DataPerangkat

def scan_device(ip_addr: str, port: int, id: str):
	client = ModbusTcpClient(
		host= ip_addr, 
		port= port,
		retries = 5, 
		no_resend_on_retry = False
	)  
	conn = client.connect()
	if conn:
		print(f"connected to {ip_addr}:{port} with device_id: {id}")
		data: DataPerangkat = DataPerangkat(
			device_id="MQ==",
			timestamp=datetime.now()
		)
		data["phase_voltage_a"] = 1000
		print(data)
		# data = []
		# for index, register in enumerate(registers[seri]):
		# 	read(client, register, data, ip_addr, index)	                  
		# client.close()  
		# logger.info(f"close connection from {ip_addr}")
		# data_sensor: DataPerangkat
		# data_sensor["phase_voltage_a"] = "90"
		# print("data_sensor",data_sensor)
	else:
		return

# def read(client, register, data, ip_addr, index):
# 	rr = client.read_holding_registers(register[0], 2, slave=1)
# 	if rr.isError():
# 		logger.warning(f"{register} - exception in pymodbus {rr}")
# 	else:
# 		data.append(rr.registers[0]*register[1])
		# logger.info(f"reading register {register[0]} from {ip_addr}, value: {rr.registers[0]*register[1]} {register[3]}")
		
if __name__ == "__main__":
	devices = get_all(load_config())
	devices = devices.get("data")
	for device in devices:
		scan_device(
			ip_addr=device.get("ip_addr"),
			port=device.get("port"),
			id=device.get("id")
		)
	# while True:
	# 	for device in devices["data"]:
	# 		scan_device(device[0], device[1], device[2])

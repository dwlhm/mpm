from pymodbus.client import ModbusTcpClient
import time
import json
from database.get import get_all_devices_ip
from device_registers.registers_repo import repo as registers
from logger import logger

def scan_device(ip_addr, seri):
	client = ModbusTcpClient(host= ip_addr, retries = 5, no_resend_on_retry = False)   # Create client object
	client.connect()
	logger.info(f"connected to {ip_addr} with seri: {seri}")
	time.sleep(2)
	data = {}
	for register in registers[seri]:
		read(client, register, data, ip_addr)	                  
	client.close()  
	logger.info(f"close connection from {ip_addr}")
	return json.dumps(data)

def read(client, register, data, ip_addr):
	logger.info(f"reading register {register} from {ip_addr}")
	rr = client.read_holding_registers(register[0], 2, slave=1)
	if rr.isError():
		logger.warning(f"{register} - exception in pymodbus {rr}")
	else:
		data[register[2]] = rr.registers[0]
		#print(f"{register}: {rr.registers}")  
		
if __name__ == "__main__":
	devices = get_all_devices_ip()
	print(devices)
	for device in devices:
	    scan_device(device[0], device[1])
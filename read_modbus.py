from pymodbus.client import ModbusTcpClient
from datetime import datetime
from time import sleep
from logger import logger
from concurrent.futures import ThreadPoolExecutor

from configuration.config import load_config
from device.db import get_all, insert_latest_data, set_device_status
from device.internal import DataPerangkat
from device_registers.registers_repo import repo as registers

def scan_device(ip_addr: str, port: int, id: str, pm_seri: str):
    client = ModbusTcpClient(
        host= ip_addr, 
        port= port, 
        timeout= 4,
    )  
    conn = client.connect()
    if conn:
        logger.info(f"{ip_addr}:{port}:{id}:{pm_seri} -> Memulai pembacaan Modbus")
        data = {}
        for register in registers[pm_seri]:  
            sleep(.3) 
            rr = client.read_holding_registers(
                address = register[0], 
                count = 2, 
                slave = 1
            )
            if rr.isError():
                logger.warning(f"{ip_addr}:{port}:{id}:{pm_seri} -> {register[0]} - {rr}")
            else:
                data[register[3]] = rr.registers[0]*register[1]
        client.close() 
        result = insert_latest_data(
            id=id,
            timestamp=datetime.now(),
            config=load_config(),
            data=data
        )
        logger.info(f"{ip_addr}:{port}:{id}:{pm_seri} -> Pembacaan Modbus selesai")
        if result.get("error"): 
            set_device_status(id, False, load_config())
            logger.warning(f"{ip_addr}:{port}:{id}:{pm_seri} -> Error db: {result.get("error")}")
        if result.get("data"): 
            set_device_status(id, True, load_config())
            logger.info(f"{ip_addr}:{port}:{id}:{pm_seri} -> Data disimpan di db")
        logger.info(f"{ip_addr}:{port}:{id}:{pm_seri} -> Koneksi Modbus ditutup")
        return
    else:
        logger.warning(f"{ip_addr}:{port}:{id}:{pm_seri} -> Gagal koneksi Modbus")
        return   

def tFunc(device):
    pm = device.get("powermeter")
    pm_seri = pm.get("seri")
    scan_device(
        ip_addr=device.get("ip_addr"),
        port=device.get("port"),
        id=device.get("id"),
        pm_seri=pm_seri
    )
        
if __name__ == "__main__":
    while True:
        devices = get_all(load_config())
        devices = devices.get("data")
        with ThreadPoolExecutor(60) as exe:
            for index, device in enumerate(devices):
                exe.submit(tFunc, device)
            exe.shutdown()
            logger.info("selesai pengambilan semua data powermeter")
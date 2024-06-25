from data import db
from device.db import get_all as get_all_perangkat
from configuration.config import load_config

if __name__ == "__main__":
    
    devices = get_all_perangkat(config=load_config())
    if (devices.get("error")): print("Error: ", devices.get("error"))

    for device in devices.get("data"):
        all_data = db.data_action_avg(id=device.get("id"),interval="yearly", config=load_config())
        if (all_data.get("error")): print("Error: ", all_data.get("error"), " / ", device.get("id"))
        
        if (all_data.get("data")):
            data = all_data.get("data")
            print(f"data location: {data[0]} / {device.get("id")}")
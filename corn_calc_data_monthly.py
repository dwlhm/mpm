from datetime import datetime, timedelta
from data import db
from configuration.config import load_config

if __name__ == "__main__":
    all_data = db.data_action_avg(id="MQ==",mode_id="monthly", config=load_config())
    if (all_data.get("error")): print("Error: ", all_data.get("error"))
    
    if (all_data.get("data")):
        data = all_data.get("data")
        print(f"data location: {data[0]}")
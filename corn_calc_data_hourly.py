from datetime import datetime, timedelta
from data import db
from configuration.config import load_config

if __name__ == "__main__":
    all_data = db.get_data(id="MQ==",mode_id="hourly", config=load_config())
    if (all_data.get("error")): print("Error: ", all_data.get("error"))
    
    if (all_data.get("data")):
        data = all_data.get("data")
        print(f"perbedaan: {len(data)}")
        sum = []
        for index, d in enumerate(data):
            item = []
            for i, value in enumerate(d):
                if i > 147: item.append(value)
                else: sum[index][i] += item

        print(sum)
from device.db import set_device_status, insert_latest_data
from configuration.config import load_config
from datetime import datetime, timedelta
from device_registers.registers_repo import repo as registers
import random

id = "MQ=="
# data = {}
start_datetime = datetime(2024, 6, 21,10,15,00)

print("start date: ", start_datetime)

last_datetime = start_datetime

def create_data():
    new_data = {}
    for register in registers["AW9L"]:
        new_data[register[3]] = random.randrange(1000,3000) * register[1]
    return new_data

for i in range(60 * 24 * 1):
    i_date = last_datetime + timedelta(minutes=1)
    print("insert data -> ", i_date)
    result = insert_latest_data(
            id=id,
            timestamp=i_date,
            config=load_config(),
            data=create_data()
        )
    last_datetime = i_date

# set_device_status(id, True, load_config())
# result = insert_latest_data(
#             id=id,
#             timestamp=datetime.now(),
#             config=load_config(),
#             data=data
#         )
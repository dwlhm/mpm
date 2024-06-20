from device.db import set_device_status, insert_latest_data
from configuration.config import load_config
from datetime import datetime

id = "MQ=="
data = {
    "phase_voltage_a": 200.0,
    "phase_voltage_b": 220.0,
    "phase_voltage_c": 230.0
}

set_device_status(id, True, load_config())
result = insert_latest_data(
            id=id,
            timestamp=datetime.now(),
            config=load_config(),
            data=data
        )
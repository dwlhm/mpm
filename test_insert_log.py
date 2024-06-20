from device.db import insert_device_logs
from configuration.config import load_config

insert_device_logs(device_id="MQ==", type="error", message="Percobaan doang", config=load_config())
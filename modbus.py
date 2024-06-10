from pymodbus.client import ModbusTcpClient
import time

client = ModbusTcpClient(
        host="10.225.0.207",
        port=502,
        timeout=2,
        )

client.connect()

# time.sleep(4)
rr = client.read_holding_registers(
        address=16384,
        count=2,
        slave=1
        )

rr1 = client.read_holding_registers(
        address=16386,
        count=2,
        slave=1
        )


if rr.isError():
    print(f"error: {rr}")
else:
    print(f"reading register 16384 value: {rr.registers}")
if rr1.isError():
    print(f"error: {rr1}")
else:
    print(f"reading register 16384 value: {rr1.registers}")

client.close()
import psycopg2
import base64
from typing import Optional
from .internal import DataPerangkat

def get_all(config):
    sql = """SELECT device.id, device.name, device.ip_addr, device.port,
                    gedung.id, gedung.name, 
                    unit.id, unit.name, 
                    kampus.id, kampus.name,
                    power_meter.id, power_meter.seri, power_meter.brand
                    FROM device 
             LEFT JOIN gedung ON device.gedung = gedung.id
             LEFT JOIN unit ON gedung.unit = unit.id
             LEFT JOIN kampus ON unit.kampus = kampus.id
             LEFT JOIN power_meter ON device.power_meter = power_meter.id"""

    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql)

                data = cur.fetchall()

                if (len(data) <= 0): return {
                    "error": "no data"
                }

                res = []
                for d in data:
                    res.append({
                        "id": base64.b64encode(str(d[0]).encode()).decode(),
                        "name": d[1],
                        "ip_addr": d[2],
                        "port": d[3],
                        "gedung": {
                            "id": base64.b64encode(str(d[4]).encode()).decode(),
                            "name": d[5],
                            "unit": {
                                "id": base64.b64encode(str(d[6]).encode()).decode(),
                                "name": d[7],
                                "kampus": {
                                    "id": base64.b64encode(str(d[8]).encode()).decode(),
                                    "name": d[9]
                                }
                            }
                        },
                        "powermeter": {
                            "id": base64.b64encode(str(d[10]).encode()).decode(),
                            "seri": d[11],
                            "brand": d[12]
                        }
                    })
                return {
                    "data": res
                }

    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error)
        return {
            "error": str(Error)
        }

def get_by_id(id: str, config):
    sql = """SELECT device.id, device.name, device.ip_addr, device.port,
                    gedung.id, gedung.name, 
                    unit.id, unit.name, 
                    kampus.id, kampus.name,
                    power_meter.id, power_meter.seri, power_meter.brand
                    FROM device 
             LEFT JOIN gedung ON device.gedung = gedung.id
             LEFT JOIN unit ON gedung.unit = unit.id
             LEFT JOIN kampus ON unit.kampus = kampus.id
             LEFT JOIN power_meter ON device.power_meter = power_meter.id
             WHERE device.id = %s"""
    
    print(str(base64.b64decode(id).decode()))

    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (str(base64.b64decode(id).decode()), ))

                d = cur.fetchone()

                if (d == None): 
                    return {
                        "error": "no data"
                    }
                return {
                    "data": {
                        "id": base64.b64encode(str(d[0]).encode()).decode(),
                        "name": d[1],
                        "ip_addr": d[2],
                        "port": d[3],
                        "gedung": {
                            "id": base64.b64encode(str(d[4]).encode()).decode(),
                            "name": d[5],
                            "unit": {
                                "id": base64.b64encode(str(d[6]).encode()).decode(),
                                "name": d[7],
                                "kampus": {
                                    "id": base64.b64encode(str(d[8]).encode()).decode(),
                                    "name": d[9]
                                }
                            }
                        },
                        "powermeter": {
                            "id": base64.b64encode(str(d[10]).encode()).decode(),
                            "seri": d[11],
                            "brand": d[12]
                        }
                    }
                }

    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error)
        return {
            "error": str(Error)
        }


def new(
        name: str, 
        gedung_id: str,
        ip_addr: str,
        port: int,
        power_meter_id: str, 
        config):
    sql = """INSERT INTO device (name, gedung, ip_addr, port, power_meter)
             VALUES (%s, %s, %s, %s, %s) RETURNING id"""

    print(port)

    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (
                    name, 
                    base64.b64decode(gedung_id).decode(), 
                    ip_addr,
                    port,
                    base64.b64decode(power_meter_id).decode()
                ))

                data = cur.fetchone()

                print(data)

                return {
                    "data": data[0]
                }

    except (Exception, psycopg2.DatabaseError) as Error:
        return {
            "error": str(Error)
        }

def update(
        name: str, 
        gedung_id: str,
        ip_addr: str,
        port: int,
        power_meter_id: str, 
        id: str,
        config):
    sql = """UPDATE device
             SET name = %s,
                 gedung = %s, 
                 ip_addr = %s, 
                 port = %s, 
                 power_meter = %s
             WHERE id= %s"""
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                res = cur.execute(sql, (
                    name, 
                    base64.b64decode(gedung_id).decode(), 
                    ip_addr,
                    port,
                    base64.b64decode(power_meter_id).decode(), 
                    base64.b64decode(id).decode(), 
                ))
                conn.commit()
                return {
                    "data": True
                }
    except (Exception, psycopg2.DatabaseError) as Error:
        return {
            "error": str(Error)
        }

def remove(id: str, config):
    sql = """DELETE FROM device
             WHERE id = %s"""
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (base64.b64decode(id).decode(), ))
                return {
                    "data": True
                }
    except (Exception, psycopg2.DatabaseError) as Error:
        return {
            "error": str(Error)
        }
    
def get_latest_data(id: str, config):
    sql = """SELECT DISTINCT ON (id) *
             FROM data
             WHERE device_id = %s
             ORDER BY id DESC
             """
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (base64.b64decode(id).decode(), ))

                d = cur.fetchone()

                print(d)

                if (d == None,): return {
                    "error": "no data"
                }
                return {
                    "data": d
                }


    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error)
        return {
            "error": str(Error)
        }

def insert_latest_data(
    id: str,
    config,
    timestamp,
    data
    # phase_voltage_a: Optional[float] = None,
    # phase_voltage_b: Optional[float] = None,
    # phase_voltage_c: Optional[float] = None,
    # wire_voltage_ab: Optional[float] = None,
    # wire_voltage_bc: Optional[float] = None,
    # wire_voltage_ca: Optional[float] = None,
    # phase_current_a: Optional[float] = None,
    # phase_current_b: Optional[float] = None,
    # phase_current_c: Optional[float] = None,
    # active_power_a: Optional[float] = None,
    # active_power_b: Optional[float] = None,
    # active_power_c: Optional[float] = None,
    # reactive_power_a: Optional[float] = None,
    # reactive_power_b: Optional[float] = None,
    # reactive_power_c: Optional[float] = None,
    # apparent_power_a: Optional[float] = None,
    # apparent_power_b: Optional[float] = None,
    # apparent_power_c: Optional[float] = None,
    # power_factor_a: Optional[float] = None,
    # power_factor_b: Optional[float] = None,
    # power_factor_c: Optional[float] = None,
    # frequency: Optional[float] = None,
    # active_power: Optional[float] = None,
    # reactive_power: Optional[float] = None,
    # positive_active_power: Optional[float] = None,
    # negative_active_power: Optional[float] = None,
    # positive_reactive_power: Optional[float] = None,
    # negative_reactive_power: Optional[float] = None,
    # current_active_power_demand: Optional[float] = None,
    # maximum_active_power_demand: Optional[float] = None,
    # current_reactive_power_demand: Optional[float] = None,
    # maximum_reactive_power_demand: Optional[float] = None,
    # a_phase_voltage_total_harmonic_content: Optional[float] = None,
    # b_phase_voltage_total_harmonic_content: Optional[float] = None,
    # c_phase_voltage_total_harmonic_content: Optional[float] = None,
    # a_phase_current_total_harmonic_content: Optional[float] = None,
    # b_phase_current_total_harmonic_content: Optional[float] = None,
    # c_phase_current_total_harmonic_content: Optional[float] = None,
    # o_phase_current: Optional[float] = None,
    # phase_voltage_maximum: Optional[float] = None,
    # wires_voltage_maximum: Optional[float] = None,
    # current_maximum: Optional[float] = None,
    # voltage_imbalance: Optional[float] = None,
    # current_imbalance: Optional[float] = None,
    # a_b_phase_voltage_angle: Optional[float] = None,
    # b_c_phase_voltage_angle: Optional[float] = None,
    # c_a_phase_voltage_angle: Optional[float] = None,
    # first_quadrant_reactive_energy: Optional[float] = None,
    # second_quadrant_reactive_energy: Optional[float] = None,
    # third_quadrant_reactive_energy: Optional[float] = None,
    # fourth_quadrant_reactive_power: Optional[float] = None,
    ):
    sql = """
    INSERT INTO data (
        device_id,
        phase_voltage_a,
        phase_voltage_b,
        phase_voltage_c,
        wire_voltage_ab,
        wire_voltage_bc,
        wire_voltage_ca,
        phase_current_a,
        phase_current_b,
        phase_current_c,
        active_power_a,
        active_power_b,
        active_power_c,
        reactive_power_a,
        reactive_power_b,
        reactive_power_c,
        apparent_power_a,
        apparent_power_b,
        apparent_power_c,
        power_factor_a,
        power_factor_b,
        power_factor_c,
        frequency,
        active_power,
        reactive_power,
        positive_active_power,
        negative_active_power,
        positive_reactive_power,
        negative_reactive_power,
        current_active_power_demand,
        maximum_active_power_demand,
        current_reactive_power_demand,
        maximum_reactive_power_demand,
        a_phase_voltage_total_harmonic_content,
        b_phase_voltage_total_harmonic_content,
        c_phase_voltage_total_harmonic_content,
        a_phase_current_total_harmonic_content,
        b_phase_current_total_harmonic_content,
        c_phase_current_total_harmonic_content,
        o_phase_current,
        phase_voltage_maximum,
        Wires_voltage_maximum,
        current_maximum,
        voltage_imbalance,
        current_imbalance,
        a_b_phase_voltage_angle,
        b_C_phase_voltage_angle,
        c_a_phase_voltage_angle,
        first_quadrant_reactive_energy,
        second_quadrant_reactive_energy,
        third_quadrant_reactive_energy,
        fourth_quadrant_reactive_power,
        timestamp
    ) VALUES (
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s, %s, %s, %s, %s, %s, %s, %s,
        %s, %s, %s
    ) RETURNING id
    """
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (
                    base64.b64decode(id).decode(),
                    data['phase_voltage_a'],
                    data['phase_voltage_b'],
                    data['phase_voltage_c'],
                    data['wire_voltage_ab'],
                    data['wire_voltage_bc'],
                    data['wire_voltage_ca'],
                    data['phase_current_a'],
                    data['phase_current_b'],
                    data['phase_current_c'],
                    data['active_power_a'],
                    data['active_power_b'],
                    data['active_power_c'],
                    data['reactive_power_a'],
                    data['reactive_power_b'],
                    data['reactive_power_c'],
                    data['apparent_power_a'],
                    data['apparent_power_b'],
                    data['apparent_power_c'],
                    data['power_factor_a'],
                    data['power_factor_b'],
                    data['power_factor_c'],
                    data['frequency'],
                    data['active_power'],
                    data['reactive_power'],
                    data['positive_active_power'],
                    data['negative_active_power'],
                    data['positive_reactive_power'],
                    data['negative_reactive_power'],
                    data['current_active_power_demand'],
                    data['maximum_active_power_demand'],
                    data['current_reactive_power_demand'],
                    data['maximum_reactive_power_demand'],
                    data['a_phase_voltage_total_harmonic_content'],
                    data['b_phase_voltage_total_harmonic_content'],
                    data['c_phase_voltage_total_harmonic_content'],
                    data['a_phase_current_total_harmonic_content'],
                    data['b_phase_current_total_harmonic_content'],
                    data['c_phase_current_total_harmonic_content'],
                    data['o_phase_current'],
                    data['phase_voltage_maximum'],
                    data['wires_voltage_maximum'],
                    data['current_maximum'],
                    data['voltage_imbalance'],
                    data['current_imbalance'],
                    data['a_b_phase_voltage_angle'],
                    data['b_c_phase_voltage_angle'],
                    data['c_a_phase_voltage_angle'],
                    data['first_quadrant_reactive_energy'],
                    data['second_quadrant_reactive_energy'],
                    data['third_quadrant_reactive_energy'],
                    data['fourth_quadrant_reactive_power'],
                    timestamp,
                ))

                data = cur.fetchone()

                print(data)

                return {
                    "data": data[0]
                }

    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error)
        return {
            "error": str(Error)
        }
import psycopg2
import base64

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
                print(data)

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
                            "name": d[5]
                        },
                        "unit": {
                            "id": base64.b64encode(str(d[6]).encode()).decode(),
                            "name": d[7]
                        },
                        "kampus": {
                            "id": base64.b64encode(str(d[8]).encode()).decode(),
                            "name": d[9]
                        },
                        "powermeter": {
                            "id": base64.b64encode(str(d[10]).encode()).decode(),
                            "name": d[11]
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

    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (base64.b64decode(id).decode(), ))

                d = cur.fetchone()

                if (d == None): return {
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
                            "name": d[5]
                        },
                        "unit": {
                            "id": base64.b64encode(str(d[6]).encode()).decode(),
                            "name": d[7]
                        },
                        "kampus": {
                            "id": base64.b64encode(str(d[8]).encode()).decode(),
                            "name": d[9]
                        },
                        "powermeter": {
                            "id": base64.b64encode(str(d[10]).encode()).decode(),
                            "name": d[11]
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
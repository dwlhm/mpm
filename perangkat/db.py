import psycopg2
import base64

def get_all(config):
    sql = """SELECT device.*, gedung.id, gedung.name FROM device 
             LEFT JOIN gedung ON device.gedung = gedung.id"""

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
                        "gedung_id": base64.b64encode(str(d[2]).encode()).decode(),
                        "ip_addr": d[3],
                        "port": d[4],
                        "power_meter_id": base64.b64encode(str(d[5]).encode()).decode()
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
    sql = """SELECT device.*, gedung.id, gedung.name FROM device 
             LEFT JOIN gedung ON device.unit = gedung.id
             WHERE device.id = %s"""

    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (base64.b64decode(id).decode(), ))

                data = cur.fetchone()

                if (data == None): return {
                    "error": "no data"
                }
                return {
                    "data": {
                        "name": data[0],
                        "unit_id": base64.b64encode(str(data[1]).encode()).decode(),
                        "unit_name": data[2]
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
        config):
    sql = """UPDATE device
             SET name = %s,
                 gedung = %s, 
                 ip_addr = %s, 
                 port = %i, 
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
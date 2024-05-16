import psycopg2
from lib.config import load_config

def get_all_devices_ip():
    config = load_config()
    sql = """SELECT ip_addr FROM device"""
    result = []
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql)
                data = cur.fetchall()
                for ip_addr in data:
                    result.append(ip_addr[0])

                
    except (Exception, psycopg2.DatabaseError) as Error:
        result = Error
    finally:
        return result

def get_device(device_id):
    """ Retrive device by device_id """
    config = load_config()
    sql = """SELECT ip_addr, device_name, seri FROM device
             WHERE id = %s"""
    result = None
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (device_id))

                result = cur.fetchone()
    except (Exception, psycopg2.DatabaseError) as Error:
        result = Error
    finally:
        return result

def get_data_latest(device_id):
    """ Retrive latest data from the device """
    config = load_config()
    sql = """SELECT data, timestamp FROM data_latest
             WHERE device_id = %s"""
    result = None
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (device_id))

                result = cur.fetchone()

    except (Exception, psycopg2.DatabaseError) as Error:
        result = Error
    
    finally:
        return result
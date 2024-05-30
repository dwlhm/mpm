import psycopg2
import base64

def new(pm_name: str, pm_seri: str, config):
    sql = """INSERT INTO power_meter(seri, brand)
             VALUES(%s, %s) RETURNING id;"""
    
    id = None

    try:
        with  psycopg2.connect(**config) as conn:
            with  conn.cursor() as cur:
                cur.execute(sql, (pm_name, pm_seri, ))
                id = cur.fetchone()[0]
                conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        return {
            "error": error
        }  
    finally: 
        return { 
            "data": id
        }
    
def get_all(config):
    sql = """SELECT * FROM power_meter"""

    try:
        with  psycopg2.connect(**config) as conn:
            with  conn.cursor() as cur:
                cur.execute(sql)
                results = cur.fetchall()
                result = []
                for res in results:
                    data = list(res)
                    data[0] = base64.b64encode(str(data[0]).encode()).decode()
                    result.append(data)
                return {
                    "data": result
                }
    except (Exception, psycopg2.DatabaseError) as Error:
        return {
            "error": Error
        }
    
def get_one(id: str, config):
    sql = """SELECT * FROM power_meter
             WHERE id = %s LIMIT 1"""
    
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (id, ))
                result = cur.fetchone()
                result = list(result)
                result[0] = base64.b64encode(str(result[0]).encode()).decode()
                print(result)
                return {
                    "data": result
                }
    except (Exception, psycopg2.DatabaseError) as Error:
        return {
            "error": Error
        }
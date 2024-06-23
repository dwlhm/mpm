import psycopg2

def get(sql, param, config):
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, param) 
                
                d = cur.fetchall()
                
                if (d == None): return {
                    "error": "no data"
                }
                return {
                    "data": d
                }

    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error, type(Error))
        return {
            "error": str(Error)
        }
        
def upsert(sql, param, config):
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, param) 
                
                d = cur.fetchone()

                conn.commit()
                
                if (d == None): return {
                    "error": "no data"
                }
                return {
                    "data": d
                }

    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error, type(Error))
        return {
            "error": str(Error)
        }
        
def delete(sql, param):
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, param) 

                conn.commit()
                
                if (d == None): return {
                    "error": "no data"
                }
                return {
                    "data": True
                }

    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error, type(Error))
        return {
            "error": str(Error)
        }
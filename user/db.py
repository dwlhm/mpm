import psycopg2
import base64

def get_user_by_username(username, config):
    sql = """SELECT full_name, email, password FROM users
             WHERE username = %s"""
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql, (username, ))

                result = cur.fetchone()
    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error)
        result = Error
    finally:
        return result
    
def insert_new_user(user, config):
    sql = """INSERT INTO users (full_name, username, email, password, role)
             VALUES(%s, %s, %s, %s, %s)"""
    
    result = None

    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                result = cur.execute(sql, (user.full_name, user.username, user.email, user.password, user.role))

                conn.commit()
    except (Exception, psycopg2.DatabaseError) as Error:
        result = Error
    finally:
        return result
    
def get_all_user(config):
    sql = """SELECT * FROM users"""
    result = None
    try:
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(sql)

                res = []
                data = cur.fetchall()

                for user in data:
                    duser = list(user)
                    duser[0] = base64.b64encode(str(user[0]).encode()).decode('UTF-8')
                    res.append(tuple(duser))

                result = tuple(res)
    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error)
        result = Error
    finally:
        return result
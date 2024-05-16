import psycopg2
from lib.config import load_config
from database.connect import connect

def create_tables():
    """ Create tables in the PostgreSQL database """
    commands = (
        """
        CREATE TABLE IF NOT EXISTS device (
            id SERIAL PRIMARY KEY,
            device_name VARCHAR(255) NOT NULL,
            ip_addr VARCHAR(255) NOT NULL,
            seri VARCHAR(255) NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS data_latest (
            data VARCHAR(10000) NOT NULL,
            device_id INT NOT NULL UNIQUE,
            timestamp TIMESTAMPTZ NOT NULL,
            CONSTRAINT fk_device FOREIGN KEY(device_id) REFERENCES device(id)
        )
        """
    )
    try:
        config = load_config()
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                for command in commands:
                    cur.execute(command)
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)

if __name__ == '__main__':
    create_tables()
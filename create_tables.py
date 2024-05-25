import psycopg2
from configuration.config import load_config
from database.connect import connect
from database.insert import insert_new_user
from main import User, get_password_hash

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
        """,
        """
        CREATE TABLE IF NOT EXISTS data_repo (
            data VARCHAR(10000) NOT NULL,
            device_id INT NOT NULL,
            timestamp TIMESTAMPTZ NOT NULL,
            CONSTRAINT fk_device FOREIGN KEY(device_id) REFERENCES device(id)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(255),
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255)
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

    config_app = load_config("configuration/database.ini", "application")

    new_user = {
        "full_name": "admin",
        "username": config_app["master_username"],
        "email": "admin@admin.admin",
        "password": get_password_hash(config_app["master_password"])
    }
    insert_new_user(User(**new_user))

if __name__ == '__main__':
    create_tables()
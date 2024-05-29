import psycopg2
from configuration.config import load_config
from database.connect import connect
from database.insert import insert_new_user, insert_new_role
from database.get import get_user_by_username, get_role_by_id
from main import User, get_password_hash

def create_tables():
    """ Create tables in the PostgreSQL database """
    commands = (
        """
        CREATE TABLE IF NOT EXISTS power_meter (
            id SERIAL PRIMARY KEY,
            seri VARCHAR(50) NOT NULL,
            brand VARCHAR(50) NOT NULL
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS device (
            id SERIAL PRIMARY KEY,
            device_name VARCHAR(50) NOT NULL,
            gedung VARCHAR(50) NOT NULL,
            unit VARCHAR(50) NOT NULL,
            kampus VARCHAR(50) NOT NULL,
            ip_addr VARCHAR(15) NOT NULL,
            power_meter INT NOT NULL,
            CONSTRAINT fk_power_meter FOREIGN KEY(power_meter) REFERENCES power_meter(id)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS data (
            device_id INT NOT NULL,

            timestamp TIMESTAMPTZ NOT NULL,
            CONSTRAINT fk_device FOREIGN KEY(device_id) REFERENCES device(id)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS role (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255)
        )
        """,
        """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            full_name VARCHAR(255),
            username VARCHAR(255),
            email VARCHAR(255),
            password VARCHAR(255),
            role INT NOT NULL,
            CONSTRAINT fk_role FOREIGN KEY(role) REFERENCES role(id)
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

    role = get_role_by_id("1")

    if role is None:
        insert_new_role("Admin")

    userExsist = get_user_by_username(config_app["master_username"])

    if userExsist is None:
        new_user = {
            "full_name": "admin",
            "username": config_app["master_username"],
            "email": "admin@admin.admin",
            "password": get_password_hash(config_app["master_password"]),
            "role": 1
        }
        res = insert_new_user(User(**new_user))
        print("Add master account: ", res)

if __name__ == '__main__':
    create_tables()
import psycopg2
import base64
from datetime import datetime, timedelta

def get_date(mode_id: str):
    match mode_id:
        case "hourly":
            return {
                "from": datetime(2024,6,22,10,15,00),
                "to": datetime(2024,6,22,10,15,00) - timedelta(hours=1)
            }
        case "daily":
            return {
                "from": datetime.today(),
                "to": datetime.today() - timedelta(days=1)
            }
        case "weekly":
            return {
                "from": datetime.today(),
                "to": datetime.today() - timedelta(weeks=1)
            }
        case "monthly":
            return {
                "from": datetime.today(),
                "to": (datetime.today().replace(day=1) - timedelta(days=31)).replace(day=1)
            }
        case _:
            return {
                "from": datetime.today(),
                "to": datetime.today() - timedelta(hours=1)
            }

def data_action_avg(mode_id: str, id:str, config: any):
    try:
        date = get_date(mode_id=mode_id)
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(mode[mode_id], (base64.b64decode(id).decode(), date.get("to"), base64.b64decode(id).decode(), date.get("to"), date.get("from"),)) 
                
                d = cur.fetchone()
                conn.commit()
                
                cur.execute(latest[mode_id], (base64.b64decode(id).decode(), date.get("to"),))

                e = cur.fetchone()

                cur.execute(update[mode_id], (e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], d))

                f = cur.fetchone()
                
                conn.commit()
                
                if (d == None): return {
                    "error": "no data"
                }
                return {
                    "data": f
                }

    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error, type(Error))
        return {
            "error": str(Error)
        }
    
mode = {
    "hourly": """INSERT INTO data_hourly (
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
        device,
        timestamp
    ) 
    SELECT    
        AVG(phase_voltage_a)::NUMERIC(10,2),
        AVG(phase_voltage_b)::NUMERIC(10,2),
        AVG(phase_voltage_c)::NUMERIC(10,2),
        AVG(wire_voltage_ab)::NUMERIC(10,2),
        AVG(wire_voltage_bc)::NUMERIC(10,2),
        AVG(wire_voltage_ca)::NUMERIC(10,2),
        AVG(phase_current_a)::NUMERIC(10,2),
        AVG(phase_current_b)::NUMERIC(10,2),
        AVG(phase_current_c)::NUMERIC(10,2),
        AVG(active_power_a)::NUMERIC(10,2),
        AVG(active_power_b)::NUMERIC(10,2),
        AVG(active_power_c)::NUMERIC(10,2),
        AVG(reactive_power_a)::NUMERIC(10,2),
        AVG(reactive_power_b)::NUMERIC(10,2),
        AVG(reactive_power_c)::NUMERIC(10,2),
        AVG(apparent_power_a)::NUMERIC(10,2),
        AVG(apparent_power_b)::NUMERIC(10,2),
        AVG(apparent_power_c)::NUMERIC(10,2),
        AVG(power_factor_a)::NUMERIC(10,2),
        AVG(power_factor_b)::NUMERIC(10,2),
        AVG(power_factor_c)::NUMERIC(10,2),
        AVG(frequency)::NUMERIC(10,2),
        AVG(current_active_power_demand)::NUMERIC(10,2),
        AVG(maximum_active_power_demand)::NUMERIC(10,2),
        AVG(current_reactive_power_demand)::NUMERIC(10,2),
        AVG(maximum_reactive_power_demand)::NUMERIC(10,2),
        AVG(a_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(a_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(o_phase_current)::NUMERIC(10,2),
        AVG(phase_voltage_maximum)::NUMERIC(10,2),
        AVG(Wires_voltage_maximum)::NUMERIC(10,2),
        AVG(current_maximum)::NUMERIC(10,2),
        AVG(voltage_imbalance)::NUMERIC(10,2),
        AVG(current_imbalance)::NUMERIC(10,2),
        AVG(a_b_phase_voltage_angle)::NUMERIC(10,2),
        AVG(b_C_phase_voltage_angle)::NUMERIC(10,2),
        AVG(c_a_phase_voltage_angle)::NUMERIC(10,2),
        %s,
        cast(%s AS TIMESTAMPTZ)
             FROM data
             WHERE device_id = %s AND
             timestamp BETWEEN cast(%s AS TIMESTAMPTZ) AND cast(%s AS TIMESTAMPTZ)
        RETURNING id
             """,
    "daily": """INSERT INTO data_daily (
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
        device,
        timestamp
    ) 
    SELECT    
        AVG(phase_voltage_a)::NUMERIC(10,2),
        AVG(phase_voltage_b)::NUMERIC(10,2),
        AVG(phase_voltage_c)::NUMERIC(10,2),
        AVG(wire_voltage_ab)::NUMERIC(10,2),
        AVG(wire_voltage_bc)::NUMERIC(10,2),
        AVG(wire_voltage_ca)::NUMERIC(10,2),
        AVG(phase_current_a)::NUMERIC(10,2),
        AVG(phase_current_b)::NUMERIC(10,2),
        AVG(phase_current_c)::NUMERIC(10,2),
        AVG(active_power_a)::NUMERIC(10,2),
        AVG(active_power_b)::NUMERIC(10,2),
        AVG(active_power_c)::NUMERIC(10,2),
        AVG(reactive_power_a)::NUMERIC(10,2),
        AVG(reactive_power_b)::NUMERIC(10,2),
        AVG(reactive_power_c)::NUMERIC(10,2),
        AVG(apparent_power_a)::NUMERIC(10,2),
        AVG(apparent_power_b)::NUMERIC(10,2),
        AVG(apparent_power_c)::NUMERIC(10,2),
        AVG(power_factor_a)::NUMERIC(10,2),
        AVG(power_factor_b)::NUMERIC(10,2),
        AVG(power_factor_c)::NUMERIC(10,2),
        AVG(frequency)::NUMERIC(10,2),
        AVG(current_active_power_demand)::NUMERIC(10,2),
        AVG(maximum_active_power_demand)::NUMERIC(10,2),
        AVG(current_reactive_power_demand)::NUMERIC(10,2),
        AVG(maximum_reactive_power_demand)::NUMERIC(10,2),
        AVG(a_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(a_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(o_phase_current)::NUMERIC(10,2),
        AVG(phase_voltage_maximum)::NUMERIC(10,2),
        AVG(Wires_voltage_maximum)::NUMERIC(10,2),
        AVG(current_maximum)::NUMERIC(10,2),
        AVG(voltage_imbalance)::NUMERIC(10,2),
        AVG(current_imbalance)::NUMERIC(10,2),
        AVG(a_b_phase_voltage_angle)::NUMERIC(10,2),
        AVG(b_C_phase_voltage_angle)::NUMERIC(10,2),
        AVG(c_a_phase_voltage_angle)::NUMERIC(10,2),
        %s,
        cast(%s AS TIMESTAMPTZ)
             FROM data_hourly
             WHERE device = %s AND
             timestamp BETWEEN cast(%s AS TIMESTAMPTZ) AND cast(%s AS TIMESTAMPTZ)
        RETURNING id
             """,
    "weekly": """INSERT INTO data_weekly (
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
        device,
        timestamp
    ) 
    SELECT    
        AVG(phase_voltage_a)::NUMERIC(10,2),
        AVG(phase_voltage_b)::NUMERIC(10,2),
        AVG(phase_voltage_c)::NUMERIC(10,2),
        AVG(wire_voltage_ab)::NUMERIC(10,2),
        AVG(wire_voltage_bc)::NUMERIC(10,2),
        AVG(wire_voltage_ca)::NUMERIC(10,2),
        AVG(phase_current_a)::NUMERIC(10,2),
        AVG(phase_current_b)::NUMERIC(10,2),
        AVG(phase_current_c)::NUMERIC(10,2),
        AVG(active_power_a)::NUMERIC(10,2),
        AVG(active_power_b)::NUMERIC(10,2),
        AVG(active_power_c)::NUMERIC(10,2),
        AVG(reactive_power_a)::NUMERIC(10,2),
        AVG(reactive_power_b)::NUMERIC(10,2),
        AVG(reactive_power_c)::NUMERIC(10,2),
        AVG(apparent_power_a)::NUMERIC(10,2),
        AVG(apparent_power_b)::NUMERIC(10,2),
        AVG(apparent_power_c)::NUMERIC(10,2),
        AVG(power_factor_a)::NUMERIC(10,2),
        AVG(power_factor_b)::NUMERIC(10,2),
        AVG(power_factor_c)::NUMERIC(10,2),
        AVG(frequency)::NUMERIC(10,2),
        AVG(current_active_power_demand)::NUMERIC(10,2),
        AVG(maximum_active_power_demand)::NUMERIC(10,2),
        AVG(current_reactive_power_demand)::NUMERIC(10,2),
        AVG(maximum_reactive_power_demand)::NUMERIC(10,2),
        AVG(a_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(a_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(o_phase_current)::NUMERIC(10,2),
        AVG(phase_voltage_maximum)::NUMERIC(10,2),
        AVG(Wires_voltage_maximum)::NUMERIC(10,2),
        AVG(current_maximum)::NUMERIC(10,2),
        AVG(voltage_imbalance)::NUMERIC(10,2),
        AVG(current_imbalance)::NUMERIC(10,2),
        AVG(a_b_phase_voltage_angle)::NUMERIC(10,2),
        AVG(b_C_phase_voltage_angle)::NUMERIC(10,2),
        AVG(c_a_phase_voltage_angle)::NUMERIC(10,2),
        %s,
        cast(%s AS TIMESTAMPTZ)
             FROM data_daily
             WHERE device = %s AND
             timestamp BETWEEN cast(%s AS TIMESTAMPTZ) AND cast(%s AS TIMESTAMPTZ)
        RETURNING id
             """,
    "monthly": """INSERT INTO data_monthly (
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
        device,
        timestamp
    ) 
    SELECT    
        AVG(phase_voltage_a)::NUMERIC(10,2),
        AVG(phase_voltage_b)::NUMERIC(10,2),
        AVG(phase_voltage_c)::NUMERIC(10,2),
        AVG(wire_voltage_ab)::NUMERIC(10,2),
        AVG(wire_voltage_bc)::NUMERIC(10,2),
        AVG(wire_voltage_ca)::NUMERIC(10,2),
        AVG(phase_current_a)::NUMERIC(10,2),
        AVG(phase_current_b)::NUMERIC(10,2),
        AVG(phase_current_c)::NUMERIC(10,2),
        AVG(active_power_a)::NUMERIC(10,2),
        AVG(active_power_b)::NUMERIC(10,2),
        AVG(active_power_c)::NUMERIC(10,2),
        AVG(reactive_power_a)::NUMERIC(10,2),
        AVG(reactive_power_b)::NUMERIC(10,2),
        AVG(reactive_power_c)::NUMERIC(10,2),
        AVG(apparent_power_a)::NUMERIC(10,2),
        AVG(apparent_power_b)::NUMERIC(10,2),
        AVG(apparent_power_c)::NUMERIC(10,2),
        AVG(power_factor_a)::NUMERIC(10,2),
        AVG(power_factor_b)::NUMERIC(10,2),
        AVG(power_factor_c)::NUMERIC(10,2),
        AVG(frequency)::NUMERIC(10,2),
        AVG(current_active_power_demand)::NUMERIC(10,2),
        AVG(maximum_active_power_demand)::NUMERIC(10,2),
        AVG(current_reactive_power_demand)::NUMERIC(10,2),
        AVG(maximum_reactive_power_demand)::NUMERIC(10,2),
        AVG(a_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(a_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(o_phase_current)::NUMERIC(10,2),
        AVG(phase_voltage_maximum)::NUMERIC(10,2),
        AVG(Wires_voltage_maximum)::NUMERIC(10,2),
        AVG(current_maximum)::NUMERIC(10,2),
        AVG(voltage_imbalance)::NUMERIC(10,2),
        AVG(current_imbalance)::NUMERIC(10,2),
        AVG(a_b_phase_voltage_angle)::NUMERIC(10,2),
        AVG(b_C_phase_voltage_angle)::NUMERIC(10,2),
        AVG(c_a_phase_voltage_angle)::NUMERIC(10,2),
        %s,
        cast(%s AS TIMESTAMPTZ)
             FROM data_weekly
             WHERE device = %s AND
             timestamp BETWEEN cast(%s AS TIMESTAMPTZ) AND cast(%s AS TIMESTAMPTZ)
        RETURNING id
             """,
    "yearly": """INSERT INTO data_yearly (
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
        device,
        timestamp
    ) 
    SELECT    
        AVG(phase_voltage_a)::NUMERIC(10,2),
        AVG(phase_voltage_b)::NUMERIC(10,2),
        AVG(phase_voltage_c)::NUMERIC(10,2),
        AVG(wire_voltage_ab)::NUMERIC(10,2),
        AVG(wire_voltage_bc)::NUMERIC(10,2),
        AVG(wire_voltage_ca)::NUMERIC(10,2),
        AVG(phase_current_a)::NUMERIC(10,2),
        AVG(phase_current_b)::NUMERIC(10,2),
        AVG(phase_current_c)::NUMERIC(10,2),
        AVG(active_power_a)::NUMERIC(10,2),
        AVG(active_power_b)::NUMERIC(10,2),
        AVG(active_power_c)::NUMERIC(10,2),
        AVG(reactive_power_a)::NUMERIC(10,2),
        AVG(reactive_power_b)::NUMERIC(10,2),
        AVG(reactive_power_c)::NUMERIC(10,2),
        AVG(apparent_power_a)::NUMERIC(10,2),
        AVG(apparent_power_b)::NUMERIC(10,2),
        AVG(apparent_power_c)::NUMERIC(10,2),
        AVG(power_factor_a)::NUMERIC(10,2),
        AVG(power_factor_b)::NUMERIC(10,2),
        AVG(power_factor_c)::NUMERIC(10,2),
        AVG(frequency)::NUMERIC(10,2),
        AVG(current_active_power_demand)::NUMERIC(10,2),
        AVG(maximum_active_power_demand)::NUMERIC(10,2),
        AVG(current_reactive_power_demand)::NUMERIC(10,2),
        AVG(maximum_reactive_power_demand)::NUMERIC(10,2),
        AVG(a_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_voltage_total_harmonic_content)::NUMERIC(10,2),
        AVG(a_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(b_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(c_phase_current_total_harmonic_content)::NUMERIC(10,2),
        AVG(o_phase_current)::NUMERIC(10,2),
        AVG(phase_voltage_maximum)::NUMERIC(10,2),
        AVG(Wires_voltage_maximum)::NUMERIC(10,2),
        AVG(current_maximum)::NUMERIC(10,2),
        AVG(voltage_imbalance)::NUMERIC(10,2),
        AVG(current_imbalance)::NUMERIC(10,2),
        AVG(a_b_phase_voltage_angle)::NUMERIC(10,2),
        AVG(b_C_phase_voltage_angle)::NUMERIC(10,2),
        AVG(c_a_phase_voltage_angle)::NUMERIC(10,2),
        %s,
        cast(%s AS TIMESTAMPTZ)
             FROM data_monthly
             WHERE device = %s AND
             timestamp BETWEEN cast(%s AS TIMESTAMPTZ) AND cast(%s AS TIMESTAMPTZ)
        RETURNING id
             """
}

update = {
    "hourly": """UPDATE data_hourly 
        SET first_quadrant_reactive_energy = %s,
        second_quadrant_reactive_energy = %s,
        third_quadrant_reactive_energy = %s,
        fourth_quadrant_reactive_power = %s,
        active_power = %s,
        reactive_power = %s,
        positive_active_power = %s,
        negative_active_power = %s,
        positive_reactive_power = %s,
        negative_reactive_power = %s,
        timestamp = cast(%s AS TIMESTAMPTZ)
        WHERE id = %s
        RETURNING id""",
    "daily": """UPDATE data_daily 
        SET first_quadrant_reactive_energy = %s,
        second_quadrant_reactive_energy = %s,
        third_quadrant_reactive_energy = %s,
        fourth_quadrant_reactive_power = %s,
        active_power = %s,
        reactive_power = %s,
        positive_active_power = %s,
        negative_active_power = %s,
        positive_reactive_power = %s,
        negative_reactive_power = %s,
        timestamp = cast(%s AS TIMESTAMPTZ)
        WHERE id = %s
        RETURNING id""",
    "weekly": """UPDATE data_weekly 
        SET first_quadrant_reactive_energy = %s,
        second_quadrant_reactive_energy = %s,
        third_quadrant_reactive_energy = %s,
        fourth_quadrant_reactive_power = %s,
        active_power = %s,
        reactive_power = %s,
        positive_active_power = %s,
        negative_active_power = %s,
        positive_reactive_power = %s,
        negative_reactive_power = %s,
        timestamp = cast(%s AS TIMESTAMPTZ)
        WHERE id = %s
        RETURNING id""",
    "monthly": """UPDATE data_monthly 
        SET first_quadrant_reactive_energy = %s,
        second_quadrant_reactive_energy = %s,
        third_quadrant_reactive_energy = %s,
        fourth_quadrant_reactive_power = %s,
        active_power = %s,
        reactive_power = %s,
        positive_active_power = %s,
        negative_active_power = %s,
        positive_reactive_power = %s,
        negative_reactive_power = %s,
        timestamp = cast(%s AS TIMESTAMPTZ)
        WHERE id = %s
        RETURNING id""",
    "yearly": """UPDATE data_yearly 
        SET first_quadrant_reactive_energy = %s,
        second_quadrant_reactive_energy = %s,
        third_quadrant_reactive_energy = %s,
        fourth_quadrant_reactive_power = %s,
        active_power = %s,
        reactive_power = %s,
        positive_active_power = %s,
        negative_active_power = %s,
        positive_reactive_power = %s,
        negative_reactive_power = %s,
        timestamp = cast(%s AS TIMESTAMPTZ)
        WHERE id = %s
        RETURNING id"""
}

latest = {
    "hourly": """SELECT DISTINCT ON (id)
        first_quadrant_reactive_energy::NUMERIC(10,2),
        second_quadrant_reactive_energy::NUMERIC(10,2),
        third_quadrant_reactive_energy::NUMERIC(10,2),
        fourth_quadrant_reactive_power::NUMERIC(10,2),
        active_power::NUMERIC(10,2),
        reactive_power::NUMERIC(10,2),
        positive_active_power::NUMERIC(10,2),
        negative_active_power::NUMERIC(10,2),
        positive_reactive_power::NUMERIC(10,2),
        negative_reactive_power::NUMERIC(10,2),
        timestamp
        FROM data
        WHERE device_id = %s AND
        timestamp <= cast(%s AS TIMESTAMPTZ)
        LIMIT 1""",
    "daily": """SELECT DISTINCT ON (id)
        first_quadrant_reactive_energy::NUMERIC(10,2),
        second_quadrant_reactive_energy::NUMERIC(10,2),
        third_quadrant_reactive_energy::NUMERIC(10,2),
        fourth_quadrant_reactive_power::NUMERIC(10,2),
        active_power::NUMERIC(10,2),
        reactive_power::NUMERIC(10,2),
        positive_active_power::NUMERIC(10,2),
        negative_active_power::NUMERIC(10,2),
        positive_reactive_power::NUMERIC(10,2),
        negative_reactive_power::NUMERIC(10,2),
        timestamp
        FROM data_hourly
        WHERE device = %s AND
        timestamp <= cast(%s AS TIMESTAMPTZ)
        LIMIT 1""",
    "weekly": """SELECT DISTINCT ON (id)
        first_quadrant_reactive_energy::NUMERIC(10,2),
        second_quadrant_reactive_energy::NUMERIC(10,2),
        third_quadrant_reactive_energy::NUMERIC(10,2),
        fourth_quadrant_reactive_power::NUMERIC(10,2),
        active_power::NUMERIC(10,2),
        reactive_power::NUMERIC(10,2),
        positive_active_power::NUMERIC(10,2),
        negative_active_power::NUMERIC(10,2),
        positive_reactive_power::NUMERIC(10,2),
        negative_reactive_power::NUMERIC(10,2),
        timestamp
        FROM data_weekly
        WHERE device = %s AND
        timestamp <= cast(%s AS TIMESTAMPTZ)
        LIMIT 1""",
    "monthly": """SELECT DISTINCT ON (id)
        first_quadrant_reactive_energy::NUMERIC(10,2),
        second_quadrant_reactive_energy::NUMERIC(10,2),
        third_quadrant_reactive_energy::NUMERIC(10,2),
        fourth_quadrant_reactive_power::NUMERIC(10,2),
        active_power::NUMERIC(10,2),
        reactive_power::NUMERIC(10,2),
        positive_active_power::NUMERIC(10,2),
        negative_active_power::NUMERIC(10,2),
        positive_reactive_power::NUMERIC(10,2),
        negative_reactive_power::NUMERIC(10,2),
        timestamp
        FROM data_monthly
        WHERE device = %s AND
        timestamp <= cast(%s AS TIMESTAMPTZ)
        LIMIT 1""",
    "yearly": """SELECT DISTINCT ON (id)
        first_quadrant_reactive_energy::NUMERIC(10,2),
        second_quadrant_reactive_energy::NUMERIC(10,2),
        third_quadrant_reactive_energy::NUMERIC(10,2),
        fourth_quadrant_reactive_power::NUMERIC(10,2),
        active_power::NUMERIC(10,2),
        reactive_power::NUMERIC(10,2),
        positive_active_power::NUMERIC(10,2),
        negative_active_power::NUMERIC(10,2),
        positive_reactive_power::NUMERIC(10,2),
        negative_reactive_power::NUMERIC(10,2),
        timestamp
        FROM data_yearly
        WHERE device = %s AND
        timestamp <= cast(%s AS TIMESTAMPTZ)
        LIMIT 1"""
}
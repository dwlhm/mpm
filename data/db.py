import psycopg2
import base64
from datetime import datetime, timedelta

def get_date(mode_id: str):
    match mode_id:
        case "hourly":
            return {
                "from": datetime.today(),
                "to": datetime.today() - timedelta(hours=1)
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

def get_data(mode_id: str, id:str, config: any):
    try:
        date = get_date(mode_id=mode_id)
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(mode[mode_id], (base64.b64decode(id).decode(), date.get("to"), date.get("from"), ))

                d = cur.fetchall()

                if (d == None): return {
                    "error": "no data"
                }
                return {
                    "data": d
                }
                # return {
                #     "data": {
                #         "data": {
                #             "phase_voltage_a": d[0],
                #             "phase_voltage_b": d[1],
                #             "phase_voltage_c": d[2],
                #             "wire_voltage_ab": d[3],
                #             "wire_voltage_bc": d[4],
                #             "wire_voltage_ca": d[5],
                #             "phase_current_a": d[6],
                #             "phase_current_b": d[7],
                #             "phase_current_c": d[8],
                #             "active_power_a": d[9],
                #             "active_power_b": d[10],
                #             "active_power_c": d[11],
                #             "reactive_power_a": d[12],
                #             "reactive_power_b": d[13],
                #             "reactive_power_c": d[14],
                #             "apparent_power_a": d[15],
                #             "apparent_power_b": d[16],
                #             "apparent_power_c": d[17],
                #             "power_factor_a": d[18],
                #             "power_factor_b": d[19],
                #             "power_factor_c": d[20],
                #             "frequency": d[21],
                #             "active_power": d[22],
                #             "reactive_power": d[23],
                #             "positive_active_power": d[24],
                #             "negative_active_power": d[25],
                #             "positive_reactive_power": d[26],
                #             "negative_reactive_power": d[27],
                #             "current_active_power_demand": d[28],
                #             "maximum_active_power_demand": d[29],
                #             "current_reactive_power_demand": d[30],
                #             "maximum_reactive_power_demand": d[31],
                #             "a_phase_voltage_total_harmonic_content": d[32],
                #             "b_phase_voltage_total_harmonic_content": d[33],
                #             "c_phase_voltage_total_harmonic_content": d[34],
                #             "a_phase_current_total_harmonic_content": d[35],
                #             "b_phase_current_total_harmonic_content": d[36],
                #             "c_phase_current_total_harmonic_content": d[37],
                #             "o_phase_current": d[38],
                #             "phase_voltage_maximum": d[39],
                #             "Wires_voltage_maximum": d[40],
                #             "current_maximum": d[41],
                #             "voltage_imbalance": d[42],
                #             "current_imbalance": d[43],
                #             "a_b_phase_voltage_angle": d[44],
                #             "b_C_phase_voltage_angle": d[45],
                #             "c_a_phase_voltage_angle": d[46],
                #             "first_quadrant_reactive_energy": d[47],
                #             "second_quadrant_reactive_energy": d[48],
                #             "third_quadrant_reactive_energy": d[49],
                #             "fourth_quadrant_reactive_power": d[50],
                #         },
                #         "timestamp": d[-1]
                #     }
                # }

    except (Exception, psycopg2.DatabaseError) as Error:
        print(Error, type(Error))
        return {
            "error": str(Error)
        }
    
mode = {
    "hourly": """SELECT DISTINCT ON (id) 
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
        first_quadrant_reactive_energy,
        second_quadrant_reactive_energy,
        third_quadrant_reactive_energy,
        fourth_quadrant_reactive_power,
        active_power,
        reactive_power,
        positive_active_power,
        negative_active_power,
        positive_reactive_power,
        negative_reactive_power,
        timestamp
             FROM data
             WHERE device_id = %s AND
             timestamp BETWEEN cast(%s AS TIMESTAMPTZ) AND cast(%s AS TIMESTAMPTZ)
             ORDER BY id DESC
             """,
    "daily": """SELECT DISTINCT ON (id) 
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
        first_quadrant_reactive_energy,
        second_quadrant_reactive_energy,
        third_quadrant_reactive_energy,
        fourth_quadrant_reactive_power,
        active_power,
        reactive_power,
        positive_active_power,
        negative_active_power,
        positive_reactive_power,
        negative_reactive_power,
        timestamp
             FROM data_daily
             WHERE device = %s BETWEEN TO_TIMESTAMP(%s, 'YYYY-MM-DD HH:MI:SS') AND %s, TO_TIMESTAMP('YYYY-MM-DD HH:MI:SS') 
             ORDER BY id DESC
             """,
    "weekly": """SELECT DISTINCT ON (id) 
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
        first_quadrant_reactive_energy,
        second_quadrant_reactive_energy,
        third_quadrant_reactive_energy,
        fourth_quadrant_reactive_power,
        active_power,
        reactive_power,
        positive_active_power,
        negative_active_power,
        positive_reactive_power,
        negative_reactive_power,
        timestamp
             FROM data_weekly
             WHERE device = %s BETWEEN %s AND %s
             ORDER BY id DESC
             """,
    "monthly": """SELECT DISTINCT ON (id) 
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
        first_quadrant_reactive_energy,
        second_quadrant_reactive_energy,
        third_quadrant_reactive_energy,
        fourth_quadrant_reactive_power,
        active_power,
        reactive_power,
        positive_active_power,
        negative_active_power,
        positive_reactive_power,
        negative_reactive_power,
        timestamp
             FROM data_monthly
             WHERE device = %s BETWEEN %s AND %s
             ORDER BY id DESC
             """,
    "yearly": """SELECT DISTINCT ON (id) 
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
        first_quadrant_reactive_energy,
        second_quadrant_reactive_energy,
        third_quadrant_reactive_energy,
        fourth_quadrant_reactive_power,
        active_power,
        reactive_power,
        positive_active_power,
        negative_active_power,
        positive_reactive_power,
        negative_reactive_power,
        timestamp
             FROM data_yearly
             WHERE device = %s BETWEEN %s AND %s
             ORDER BY id DESC
             """
}
from fastapi import APIRouter, Depends, HTTPException
from typing import Literal
from .db import get_data
from dependencies import oauth2_scheme
from configuration.config import load_config

router = APIRouter(
    prefix="/data",
    tags=["Data"],
    dependencies=[Depends(oauth2_scheme)]
)

@router.get("/{id}")
async def get_latest_data_by_interval(id: str, mode: Literal["hourly", "daily", "weekly", "monthly", "yearly"]):
    result = get_data(
        mode_id=mode,
        id=id,
        config=load_config()
    )
    if (result.get("error")): raise HTTPException(
            status_code=400,
            detail=result.get("error")
        )

    d = result.get("data")[0]
    print(d)
    return {
        "status": "success",
        "results": {
            "data": {
                            "phase_voltage_a": d[0],
                            "phase_voltage_b": d[1],
                            "phase_voltage_c": d[2],
                            "wire_voltage_ab": d[3],
                            "wire_voltage_bc": d[4],
                            "wire_voltage_ca": d[5],
                            "phase_current_a": d[6],
                            "phase_current_b": d[7],
                            "phase_current_c": d[8],
                            "active_power_a": d[9],
                            "active_power_b": d[10],
                            "active_power_c": d[11],
                            "reactive_power_a": d[12],
                            "reactive_power_b": d[13],
                            "reactive_power_c": d[14],
                            "apparent_power_a": d[15],
                            "apparent_power_b": d[16],
                            "apparent_power_c": d[17],
                            "power_factor_a": d[18],
                            "power_factor_b": d[19],
                            "power_factor_c": d[20],
                            "frequency": d[21],
                            "active_power": d[22],
                            "reactive_power": d[23],
                            "positive_active_power": d[24],
                            "negative_active_power": d[25],
                            "positive_reactive_power": d[26],
                            "negative_reactive_power": d[27],
                            "current_active_power_demand": d[28],
                            "maximum_active_power_demand": d[29],
                            "current_reactive_power_demand": d[30],
                            "maximum_reactive_power_demand": d[31],
                            "a_phase_voltage_total_harmonic_content": d[32],
                            "b_phase_voltage_total_harmonic_content": d[33],
                            "c_phase_voltage_total_harmonic_content": d[34],
                            "a_phase_current_total_harmonic_content": d[35],
                            "b_phase_current_total_harmonic_content": d[36],
                            "c_phase_current_total_harmonic_content": d[37],
                            "o_phase_current": d[38],
                            "phase_voltage_maximum": d[39],
                            "Wires_voltage_maximum": d[40],
                            "current_maximum": d[41],
                            "voltage_imbalance": d[42],
                            "current_imbalance": d[43],
                            "a_b_phase_voltage_angle": d[44],
                            "b_C_phase_voltage_angle": d[45],
                            "c_a_phase_voltage_angle": d[46],
                            "first_quadrant_reactive_energy": d[47],
                            "second_quadrant_reactive_energy": d[48],
                            "third_quadrant_reactive_energy": d[49],
                            "fourth_quadrant_reactive_power": d[50],
                        },
                        "timestamp": d[-1]
        }
    }
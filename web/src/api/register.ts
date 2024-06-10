import axios from 'axios';
import { QueryFunctionContext } from "react-query";
import { Powermeter } from './powermeter';
import { Api } from './internal';
import { Token } from '../auth';

export const REGISTER_PARAM: string[] = [
  'phase_voltage_a',
  'phase_voltage_b',
  'phase_voltage_c',
  'wire_voltage_ab',
  'wire_voltage_bc',
  'wire_voltage_ca',
  'phase_current_a',
  'phase_current_b',
  'phase_current_c',
  'active_power_a',
  'active_power_b',
  'active_power_c',
  'reactive_power_a',
  'reactive_power_b',
  'reactive_power_c',
  'apparent_power_a',
  'apparent_power_b',
  'apparent_power_c',
  'power_factor_a',
  'power_factor_b',
  'power_factor_c',
  'frequency',
  'active_power',
  'reactive_power',
  'positive_active_power',
  'negative_active_power',
  'positive_reactive_power',
  'negative_reactive_power',
  'current_active_power_demand',
  'maximum_active_power_demand',
  'current_reactive_power_demand',
  'maximum_reactive_power_demand',
  'a_phase_voltage_total_harmonic_content',
  'b_phase_voltage_total_harmonic_content',
  'c_phase_voltage_total_harmonic_content',
  'a_phase_current_total_harmonic_content',
  'b_phase_current_total_harmonic_content',
  'c_phase_current_total_harmonic_content',
  'o_phase_current',
  'phase_voltage_maximum',
  'Wires_voltage_maximum',
  'current_maximum',
  'voltage_imbalance',
  'current_imbalance',
  'a_b_phase_voltage_angle',
  'b_C_phase_voltage_angle',
  'c_a_phase_voltage_angle',
  'first_quadrant_reactive_energy',
  'second_quadrant_reactive_energy',
  'third_quadrant_reactive_energy',
  'fourth_quadrant_reactive_power'
]

export type RegisterItem = [alamat: Number, pengkali: Number, besaran: String, nama: String, param: String ]

export interface Register {
    id?: string,
    register: string,
    powermeter?: Powermeter
}

export async function getRegisterByPowermeter(context: QueryFunctionContext): Promise<Api<Register>> {
    const config = {
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/powermeter/${context.queryKey[2]}/register`,
        headers: {
          'Authorization': `Bearer ${context.queryKey[1]}`
        }
    }
    
    const { data } = await axios(config)
    return data
}

export async function addRegister(props: Token<Register>) {
    const config = {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${props.token}`,
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({
          register: props.data.register
        })
    }
    
    const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/powermeter/${props.data.powermeter?.id}/register`, config)
    
    return res
}
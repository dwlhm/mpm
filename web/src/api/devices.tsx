import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { Token } from "../auth";

export type Devices = [string, string, number, string]
export type Datasheets = [number, number, string, string]

export interface SensorData {
  data: string,
  timestamp: string
}

export interface Api<T> {
  status: string,
  results: T
}

export interface Data<T> {
  data: T
}

export interface DeviceDetail {
  name: string,
  ip_addr: string,
  seri?: 'AW9L' | string 
}

export async function getDevices(context: QueryFunctionContext): Promise<Api<{ data: Devices[] }>> {
    const config = {
        method: 'get',
        url: 'http://localhost:8000/devices',
        headers: { 
          'Authorization': `Bearer ${context.queryKey[1]}`
        }
      };

      const {data} = await axios(config)
      return data as Api<{ data: Devices[] }>
}

export async function getDeviceDetail(context: QueryFunctionContext): Promise<Api<DeviceDetail>> {
  const config = {
    method: 'get',
    url: `${import.meta.env.VITE_BACKEND_URL}/devices/${context.queryKey[2]}`,
    headers: {
      'Authorization': `Bearer ${context.queryKey[1]}`
    }
  }

  const { data } = await axios(config)
  data.results = {
    name: data.results[1],
    ip_addr: data.results[0],
    seri: data.results[2]
  }
  return data
}

export async function newDevices(props: Token<DeviceDetail>) {
  const config = {
    method: 'post',
    headers: {
      'Authorization': `Bearer ${props.token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(props.data)
  }

  const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/devices`, config)

  return res
}

export async function updateDevices(props: Token<{device: DeviceDetail, id: string}>): Promise<Api<null>> {
  
  console.log(props.data.device)
  
  const config = {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${props.token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify(props.data.device)
  }

  const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/devices/${props.data.id}`, config)

  return data
}


export async function removeDevices(props: {token: string | null, id: string}) {
  const config = {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${props.token}`
    }
  }

  const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/devices/${props.id}`, config)

  return res
}

export async function getSensorData(context: QueryFunctionContext): Promise<Api<SensorData>> {
  const config = {
    method: "get",
    headers: {
      'Authorization': `Bearer ${context.queryKey[1]}`
    }
  }

  const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/devices/${context.queryKey[2]}/latest`, config)
  return data
}

export async function getDatasheetDevices(context: QueryFunctionContext): Promise<Api<Datasheets[]>> {
  const config = {
    method: "get",
    headers: {
      'Authorization': `Bearer ${context.queryKey[1]}`
    }
  }

  const { data } = await axios(`${import.meta.env.VITE_BACKEND_URL}/datasheet/${context.queryKey[2] == "undefined" ? "AW9L" : context.queryKey[2]}`, config)
  return data
}
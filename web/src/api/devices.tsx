import axios from "axios";
import { QueryFunctionContext } from "react-query";
import { Token } from "../auth";

export type Devices = [string, string, number, string]

export interface Api<T> {
  status: string,
  results: T[]
}

export interface DeviceDetail {
  name: string,
  ip_addr: string,
  seri?: 'AW9L' | string 
}

export async function getDevices(context: QueryFunctionContext): Promise<Api<Devices>> {
    const config = {
        method: 'get',
        url: 'http://localhost:8000/devices',
        headers: { 
          'Authorization': `Bearer ${context.queryKey[1]}`
        }
      };

      const {data} = await axios(config)
      return data as Api<Devices>
}

export async function newDevices(props: Token<DeviceDetail>) {
  console.log("data", JSON.stringify(props.data))
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
import axios from "axios"
import { QueryFunctionContext } from "react-query";
import { Token } from "../auth"
import { Api } from "./internal";

export interface Powermeter {
    id?: string,
    seri: string,
    brand: string
}

export async function getPowermeter(context: QueryFunctionContext): Promise<Api<Powermeter[]>> {
    const config = {
        method: 'get',
        url: `${import.meta.env.VITE_BACKEND_URL}/powermeter`,
        headers: { 
          'Authorization': `Bearer ${context.queryKey[1]}`
        }
      };

      const {data} = await axios(config)
      return data as Api<Powermeter[]>
}

export async function newPowermeter(props: Token<Powermeter>) {
    const config = {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${props.token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify({
        seri: props.data.seri,
        brand: props.data.brand
      })
    }
  
    const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/powermeter`, config)
  
    return res
}

export async function updatePowermeter(props: Token<Powermeter>): Promise<Api<Powermeter>> {
  
  const config = {
    method: 'put',
    headers: {
      'Authorization': `Bearer ${props.token}`,
      'Content-Type': 'application/json'
    },
    data: JSON.stringify({
      seri: props.data.seri,
      brand: props.data.brand
    })
  }

  const {data} = await axios(`${import.meta.env.VITE_BACKEND_URL}/powermeter/${props.data.id}`, config)

  return data
}

export async function removePowermeter(props: {token: string | null, id: string}) {
  const config = {
    method: 'delete',
    headers: {
      'Authorization': `Bearer ${props.token}`
    }
  }

  const res = await axios(`${import.meta.env.VITE_BACKEND_URL}/powermeter/${props.id}`, config)

  return res
}
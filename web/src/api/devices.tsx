import axios from "axios";
import { QueryFunctionContext } from "react-query";

export async function getDevices(context: QueryFunctionContext) {
    const config = {
        method: 'get',
        url: 'http://localhost:8000/devices',
        headers: { 
          'Authorization': `Bearer ${context.queryKey[1]}`
        }
      };

      const {data} = await axios(config)
      return data
}
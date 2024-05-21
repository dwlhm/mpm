import axios from "axios";
import { AuthContext } from "../auth";

export async function getDevices(context: AuthContext) {
    const config = {
        method: 'get',
        url: 'http://localhost:8000/devices',
        headers: { 
          'Authorization': `Bearer ${token}`
        }
      };

      const {data} = await axios(config)
      return data
}
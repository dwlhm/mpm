import { Gedung } from "@/api/gedung";
import { Api } from "@/api/internal";
import { Powermeter } from "@/api/powermeter";
import axios from "axios";
import { QueryFunctionContext } from "react-query";

export interface DetailPerangkat {
  id?: string;
  name: string;
  ip_addr: string;
  port?: number | 502;
  gedung: Gedung;
  powermeter: Powermeter;
  status?: string;
}

export async function getDetailPerangkat(
  context: QueryFunctionContext,
): Promise<Api<DetailPerangkat>> {
  const config = {
    method: "get",
    url: `${import.meta.env.VITE_BACKEND_URL}/device/${context.queryKey[2]}/`,
    headers: {
      Authorization: `Bearer ${context.queryKey[1]}`,
    },
  };

  const { data } = await axios(config);
  return data;
}

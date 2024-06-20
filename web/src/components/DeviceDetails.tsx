import { useQuery } from "react-query"
import { getDeviceDetail } from "../api/devices"
import { PerangkatOptions } from "@/perangkat/layouts"
import Loadings from "./Loadings"
import Errors from "./Errors"

export default function DeviceDetails(props: { token: string | null, perangkatId: string, powermeterId: (data: string | undefined) => void }) {
    const { isLoading, isError, isSuccess, data, ...queryInfo } = useQuery({
      queryKey: [`devices.${props.perangkatId}`, props.token, props.perangkatId ],
      queryFn: getDeviceDetail,
      onSuccess(data) {
        props.powermeterId(data.results.powermeter.id)
      },
    })
  
    if (isLoading) return <Loadings />
    if (isError) return <Errors process="mendapatkan data detail perangkat" message={queryInfo.error as string} />
    if (isSuccess) {
      
      return(
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='font-semibold text-xl'>{data.results.name}</h2>
            <p className="text-sm">{data.results.ip_addr} - {data.results.powermeter.seri}({data.results.powermeter.brand})</p>  
          </div>
          <div>
            <PerangkatOptions perangkatId={props.perangkatId} />
          </div>
        </div>
      )
    }
  }
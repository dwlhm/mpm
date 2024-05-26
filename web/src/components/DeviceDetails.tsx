import { useQuery } from "react-query"
import { getDeviceDetail } from "../api/devices"
import PerangkatOptions from "./PerangkatOptions"
import Loadings from "./Loadings"
import Errors from "./Errors"

export default function DeviceDetails(props: { token: string | null, perangkatId: string, seri: (data: string | undefined) => void }) {
    const { isLoading, isError, isSuccess, data, ...queryInfo } = useQuery({
      queryKey: [`devices.${props.perangkatId}`, props.token, props.perangkatId ],
      queryFn: getDeviceDetail,
      onSuccess(data) {
        props.seri(data.results.seri)
      },
    })
  
    if (isLoading) return <Loadings />
    if (isError) return <Errors process="mendapatkan data detail perangkat" message={queryInfo.error as string} />
    if (isSuccess) {
      
      return(
        <div className='flex justify-between items-center'>
          <div>
            <h2 className='font-semibold text-xl'>{data.results.name}</h2>
            <p className="text-sm">{data.results.ip_addr} - {data.results.seri}</p>  
          </div>
          <div>
            <PerangkatOptions perangkatId={props.perangkatId} />
          </div>
        </div>
      )
    }
  }
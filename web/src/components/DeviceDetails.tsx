import { useQuery } from "react-query"
import { getDeviceDetail } from "../api/devices"
import PerangkatOptions from "./PerangkatOptions"

export default function DeviceDetails(props: { token: string | null, perangkatId: string, seri: (data: string) => void }) {
    const { isLoading, isError, isSuccess, data, ...queryInfo } = useQuery({
      queryKey: [`devices.${props.perangkatId}`, props.token, props.perangkatId ],
      queryFn: getDeviceDetail
    })
  
    if (isLoading) return <p>Mendapatkan data perangkat...</p>
    if (isError) return <p className='text-red-800'><span className='font-semibold'>Error: </span>{queryInfo.error as String}</p>
    if (isSuccess) {
        console.log(data)
      props.seri(data.results.seri)
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
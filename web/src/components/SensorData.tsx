import { useQuery } from "react-query"
import { getDatasheetDevices } from "../api/devices"
import Loadings from "./Loadings"
import Errors from "./Errors"
import ChartsView from "./ChartsView"
import { AxiosError } from "axios"

export default function SensorData(props: { token: string | null, perangkatId: string, seri: string | "AW9L" }) {

  const { isLoading, isError, isSuccess, data, error} = useQuery<any, AxiosError>({
    queryFn: getDatasheetDevices,
    queryKey: [ `datasheets.${props.seri}`, props.token, props.seri],
  })

  if (isLoading) return <Loadings />
  if (isError) return <Errors process="request datasheet perangkat" message={error} />
  if (isSuccess) return <ChartsView datasheet={data.results} perangkatId={props.perangkatId} token={props.token}/>
}


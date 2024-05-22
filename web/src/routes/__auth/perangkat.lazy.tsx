import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { useQueryClient, useQuery } from 'react-query'
import { Api, Devices, getDevices } from "../../api/devices"
import { useAuth } from '../../auth'
import { AxiosError } from 'axios'

export const Route = createLazyFileRoute('/__auth/perangkat')({
  component: Dashboard
})


function Dashboard() {

  const user = useAuth()

  const { isFetching, isLoading, isError, isSuccess, data, ...queryInfo } = useQuery<Api<Devices>, AxiosError>({
    queryKey: ['devices', user.token],
    queryFn: getDevices
  })

  if (isLoading) return <p>Mendapatkan data perangkat...</p>
  if (isError) return <p className='text-red-800'><span className='font-semibold'>Error: </span>{queryInfo.error?.message}</p>
  if (isSuccess) return (
    <>
    <div>
      <div className='grid grid-cols-5 gap-4'>
        {
          data.results.map(data => {
            return <DeviceCard data={data} />
          })
        }
      </div>
      <div className='absolute bottom-10 right-10'>
        <Link 
          to={'/perangkat/baru'}
          className='bg-blue-900 rounded-full py-2 px-5 text-white shadow-md border border-2 border-blue-900 hover:border-blue-600 transition hover:shadow-lg'>
          + Perangkat Baru
        </Link>
      </div>
    </div>
    <Outlet />
    </>
  )
}

function DeviceCard(props: {data: Devices}) {
  const [ ip, seri, id, name ] = props.data
  return(
    <Link to={`/perangkat/${id}`} key={ip} className='transition shadow-md rounded py-2 px-3 bg-white border border-2 border-white hover:border-blue-800 hover:shadow-xl'>
      <h4 className='font-medium text-lg mb-1 capitalize'>{name}</h4>
      <p className='text-xs text-slate-800'>{ip}</p>
    </Link>
  )
}
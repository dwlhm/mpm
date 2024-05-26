import { Link, Outlet, createLazyFileRoute, useParams } from '@tanstack/react-router'
import { useQuery } from 'react-query'
import { Api, Devices, getDevices } from "../../api/devices"
import { useAuth } from '../../auth'
import { AxiosError } from 'axios'
import Loadings from "../../components/Loadings"
import Errors from '../../components/Errors'

export const Route = createLazyFileRoute('/__auth/perangkat')({
  component: Dashboard
})

function Dashboard() {

  const user = useAuth()
  const { perangkatId } = useParams({ strict: false }) as { perangkatId: string }
  const isViewAllMode = !perangkatId

  const { isLoading, isError, isSuccess, data, error } = useQuery<Api<Devices[]>, AxiosError>({
    queryKey: ['devices', user.token],
    queryFn: getDevices,
    retry: 2
  })

  if (isLoading) return <Loadings />
  if (isError) return <Errors process='mendapatkan list data perangkat' message={error} />
  if (isSuccess) return (
    <div className={`flex grow w-full ${!perangkatId ? 'bg-gray-200' : 'bg-blue-900 relative'}`}>
      <div className={`${perangkatId && 'max-w-64'} w-full p-2`}>
        <div className={`grid ${!perangkatId && 'grid-cols-5'} gap-4`}>
          {data.results.map((data, index) => {
              return (
                <Link 
                  key={index}
                  to={`/perangkat/${data[2]}`}
                  className={`perangkat transition py-2 px-3 ${isViewAllMode ? 'bg-white border border-2 border-white hover:border-blue-800 shadow-md hover:shadow-xl rounded' : 'text-gray-100 hover:bg-gray-800/50 hover:rounded'}`}>
                  <h4 className='font-medium text-lg mb-1 capitalize'>{data[3]}</h4>
                  <p className={`text-xs ${isViewAllMode ? 'text-slate-800' :'text-gray-200' }`}>{data[0]}</p>
                </Link>)
            })
          }
        </div>
        <div className='fixed bottom-10 right-10'>
          <Link 
            to={'/perangkat/baru'}
            className='bg-blue-900 rounded-full py-2 px-5 text-white shadow-md border border-2 border-blue-900 hover:border-blue-600 transition hover:shadow-lg'>
            + Perangkat Baru
          </Link>
        </div>
      </div>
      <Outlet />
    </div>
  )
}
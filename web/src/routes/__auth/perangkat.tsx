import { Link, Outlet, createFileRoute, useParams } from '@tanstack/react-router'
import { useQuery } from 'react-query'
import { Api } from '../../api/internal'
import { DeviceDetail, getDevices } from "../../api/devices"
import { useAuth } from '../../auth'
import { AxiosError } from 'axios'
import Loadings from "../../components/Loadings"
import Errors from '../../components/Errors'
import { CpuChipIcon } from '@heroicons/react/24/outline'
import React from 'react'

export const Route = createFileRoute('/__auth/perangkat')({
  component: Dashboard
})

function Dashboard() {

  const user = useAuth()
  const menuRef = React.useRef<HTMLDivElement>(null)
  const { perangkatId } = useParams({ strict: false }) as { perangkatId: string }
  const isViewAllMode = !perangkatId

  const { isLoading, isError, isSuccess, data, error } = useQuery<Api<DeviceDetail[]>, AxiosError>({
    queryKey: ['devices', user.token],
    queryFn: getDevices,
    retry: 2
  })

  const openMenu = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current?.classList.contains("hidden")) ref.current?.classList.replace("hidden", "grid")
    else ref.current?.classList.replace("grid", "hidden")
  }

  if (isLoading) return <>
    <Loadings />
    <Outlet />
  </>
  if (isError) return <>
    <Errors process='mendapatkan list data perangkat' message={error} action={<Link 
        to={'/perangkat/baru'}
        className='bg-blue-900 rounded-full py-2 px-5 text-white shadow-md border border-2 border-blue-900 hover:border-blue-600 transition hover:shadow-lg'>
          + Perangkat Baru
      </Link>} />
    <Outlet />
    </>
  if (isSuccess) return (
    <div className={`flex grow w-full ${!perangkatId ? 'bg-gray-200' : 'bg-blue-900 flex-col sm:flex-row'}`}>
      <div className={`${perangkatId && 'sm:max-w-64 sticky top-16 sm:bottom-0 sm:h-[calc(100vh-3.9rem)]'} w-full p-2 overflow-auto`}>
        <div className={`grid ${!perangkatId ? 'sm:grid-cols-3 lg:grid-cols-5' : 'hidden sm:grid'} gap-4`} ref={menuRef}>
          {data.results.map((data, index) => {
            const perangkatId = data.id as string
              return (
                <Link 
                  key={index}
                  to='/perangkat/$perangkatId'
                  params={{ perangkatId }}
                  className={`perangkat transition py-2 px-3 flex items-center gap-3 ${isViewAllMode ? 'bg-white border border-2 border-white hover:border-blue-800 shadow-md hover:shadow-xl rounded' : 'text-gray-100 hover:bg-gray-800/50 hover:rounded'}`}>
                  <CpuChipIcon className={`w-6 h-6 ${isViewAllMode ? 'text-slate-800' : 'text-white/60'}`} />
                  <div>
                    <h4 className='font-medium text-lg mb-1 capitalize'>{data.name}</h4>
                    <p className={`text-xs ${isViewAllMode ? 'text-slate-800' :'text-gray-200' }`}>{data.ip_addr}:{data.port}</p>
                  </div>
                </Link>
                )
            })
          }
        </div>
        {
          perangkatId && <button className='sm:hidden bg-gray-900 text-gray-200 text-sm py-2 px-5 w-full text-center rounded mb-2' onClick={() => openMenu(menuRef)}>Daftar Perangkat</button>
        }
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
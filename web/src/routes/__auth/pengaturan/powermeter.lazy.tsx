import { Api } from '../../../api/internal'
import { Kampus as KampusInf, getKampus } from '../../../api/kampus'
import { useAuth } from '../../../auth'
import Errors from '../../../components/Errors'
import Loadings from '../../../components/Loadings'
import { Link, Outlet, createLazyFileRoute, useParams } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useQuery } from 'react-query'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { Powermeter, getPowermeter } from '../../../api/powermeter'

export const Route = createLazyFileRoute('/__auth/pengaturan/powermeter')({
  component: PengaturanPowermeter
})

function PengaturanPowermeter() {

  const auth = useAuth()
  const { powermeterId } = useParams<any>({ strict: false })
  const { isLoading, isError, error, isSuccess, data } = useQuery<Api<Powermeter[]>, AxiosError>({
    queryKey: ['powermeter', auth.token],
    queryFn: getPowermeter,
    retry: 2
  })
  const powermeter_data = data?.results.find(item => item.id == powermeterId )

  if (isLoading) return <Loadings />

  if (isError) return (
    <>
      <Errors process='mendapatkan data list powermeter' message={error} />
      <Outlet />
    </>)
  
  if (isSuccess) return(
    <div>
      <header>
        <h2 className='py-1 flex gap-1 items-center'>
          <Link to="/pengaturan/powermeter" className='text-2xl'>Powermeter</Link> { 
          powermeter_data 
            && <><ChevronRightIcon className='w-6 h-6 inline' /> <span className='text-blue-900 font-medium'><Link
              to='/pengaturan/powermeter/$powermeterId'
              params={{ powermeterId }}>{powermeter_data.seri}</Link></span></>
          }
        </h2>
        <Link 
          to='/pengaturan/powermeter/baru'
          className="bg-blue-900 py-2 px-4 mb-2 mt-3 text-white rounded inline-block transition hover:bg-blue-900/90">Tambah Powermeter</Link> 
      </header>
      <main className='mt-5'>
        { !powermeterId && <ListPowermeter data={data} /> }
        <Outlet />
      </main>
    </div>
  )
}

function ListPowermeter(props: { data: Api<Powermeter[]> }) {

  return(
    <div className={`flex grow w-full`}>
      <div className={`w-full py-2 overflow-auto`}>
        <div className={`grid grid-cols-5 gap-4`}>
          {props.data.results.map((data, index) => {

            const powermeterId = data.id as string

              return (
                <Link 
                  key={index}
                  to='/pengaturan/powermeter/$powermeterId'
                  params={{ powermeterId }}
                  className={`pengaturan transition py-2 px-4 flex items-center gap-3 text-white bg-blue-900 border border-2 border-blue-900 hover:border-slate-800 rounded`}>
                  <HomeIcon className={`w-6 h-6 text-white`} />
                  <div className='ml-2'>
                    <h4 className='font-medium text-lg capitalize'>{data.seri}</h4>
                      <p className='text-sm mt-2 text-white/80'><span>Brand:</span> {data.brand}</p>
                  </div>
                </Link>)
            })
          }
        </div>
      </div>
    </div>
  )
}
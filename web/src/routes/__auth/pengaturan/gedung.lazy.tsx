import { useQuery } from 'react-query'
import { useAuth } from '../../../auth'
import { Api } from '../../../api/internal'
import { Link, Outlet, createLazyFileRoute, useParams } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import Loadings from '../../../components/Loadings'
import Errors from '../../../components/Errors'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Gedung, getGedung } from '../../../api/gedung'

export const Route = createLazyFileRoute('/__auth/pengaturan/gedung')({
  component: PengaturanGedung
})


function PengaturanGedung() {
    
    const auth = useAuth()
    const { gedungId } = useParams<any>({ strict: false })
    const { isLoading, isError, error, isSuccess, data } = useQuery<Api<Gedung[]>, AxiosError>({
      queryKey: ['gedung', auth.token],
      queryFn: getGedung,
      retry: 2
    })
    const gedung_id = data?.results.find(item => item.id == gedungId )
      if (isLoading) return <Loadings />
  
      if (isError) return (<>
          <Errors 
            process='mendapatkan data list gedung' 
            message={error}
            action={<Link 
              className='bg-blue-900 py-1 px-3 rounded text-white transition hover:bg-blue-900/80'
              to='/pengaturan/gedung/baru'>Tambah Gedung</Link>}  
          />
          <Outlet />
        </>)
      
      if (isSuccess) return(
          <div>
          <header>
              <h2 className='py-1 flex gap-1 items-center'>
              <Link to='/pengaturan/gedung' className='text-2xl'>Gedung</Link> { 
              gedung_id 
                  && <><ChevronRightIcon className='w-6 h-6 inline' /> <span className='text-blue-900 font-medium'><Link
                  to='/pengaturan/gedung/$gedungId'
                  params={{ gedungId }}>{gedung_id.name}</Link></span></>
              }
              </h2>
              <Link 
              to='/pengaturan/gedung/baru'
              className="bg-blue-900 py-2 px-4 mb-2 mt-3 text-white rounded inline-block transition hover:bg-blue-900/90">Tambah Gedung</Link> 
          </header>
          <main className='mt-5'>
              { !gedungId && <ListGedung data={data} /> }
              <Outlet />
          </main>
          </div>
      )
  }
  
  function ListGedung(props: { data: Api<Gedung[]> }) {

      return(
        <div className={`flex grow w-full`}>
          <div className={`w-full py-2 overflow-auto`}>
            <div className={`grid grid-cols-5 gap-4`}>
              {props.data.results.map((data, index) => {
                
                  const gedungId = data.id as string
                    
                  return (
                    <Link 
                      key={index}
                      to={`/pengaturan/gedung/$gedungId`}
                      params={{ gedungId }}
                      className={`pengaturan transition py-2 px-4 flex items-center gap-3 text-white bg-blue-900 border border-2 border-blue-900 hover:border-slate-800 rounded`}>
                      <HomeIcon className={`w-6 h-6 text-white`} />
                      <div className='ml-2'>
                        <h4 className='font-medium text-lg capitalize'>{data.name}</h4>
                        <p className='text-sm mt-2 text-white/80'><span>Kampus:</span> {data.unit?.kampus?.name}</p>
                        <p className='text-sm text-white/80'><span>Unit:</span> {data.unit?.name}</p>
                      </div>
                    </Link>)
                })
              }
            </div>
          </div>
        </div>
      )
    }
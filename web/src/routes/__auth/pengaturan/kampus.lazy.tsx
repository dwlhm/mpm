import { Api } from '../../../api/internal'
import { Kampus as KampusInf, getKampus } from '../../../api/kampus'
import { AuthContext, useAuth } from '../../../auth'
import Errors from '../../../components/Errors'
import Loadings from '../../../components/Loadings'
import { Link, Outlet, createLazyFileRoute, useParams } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { HomeIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export const Route = createLazyFileRoute('/__auth/pengaturan/kampus')({
  component: Kampus
})

function Kampus() {

  const auth = useAuth()
  const { kampusId } = useParams<any>({ strict: false })
  const queryClient = useQueryClient()
  const { isLoading, isError, error, isSuccess, data } = useQuery<Api<KampusInf[]>, AxiosError>({
    queryKey: ['kampus', auth.token],
    queryFn: getKampus,
    retry: 2
  })
  const kampus_id = data?.results.find(item => item.id == kampusId )

  if (isLoading) <Loadings />

  if (isError) <Errors process='mendapatkan data list kampus' message={error} />
  
  if (isSuccess) return(
    <div>
      <header>
        <h2>Kampus { kampus_id && <><ChevronRightIcon className='w-6 h-6' /> <span className='text-blue-900 font-medium'>dd</span></>}</h2>
        <Link to='/pengaturan/kampus/baru'>Kampus Baru</Link> 
      </header>
      <main>
        <ListKampus data={data} kampus_id='' />
      </main>
      <Outlet />
    </div>
  )
}

function ListKampus(props: { data: Api<KampusInf[]>, kampus_id: string }) {

  return(
    <div className={`flex grow w-full ${props.kampus_id && 'bg-gray-200'}`}>
      <div className={`${props.kampus_id && 'max-w-64 sticky top-16 bottom-0 h-[calc(100vh-3.9rem)]'} w-full p-2 overflow-auto`}>
        <div className={`grid ${!props.kampus_id && 'grid-cols-5'} gap-4`}>
          {props.data.results.map((data, index) => {
              return (
                <Link 
                  key={index}
                  to={`/pengaturan/kampus/${data.id}`}
                  className={`perangkat transition py-2 px-3 flex items-center gap-3 ${!props.kampus_id ? 'text-white bg-blue-900 border border-2 border-blue-900 hover:border-slate-800 rounded' : 'text-gray-100 hover:bg-gray-800/50 hover:rounded'}`}>
                  <HomeIcon className={`w-6 h-6 ${!props.kampus_id ? 'text-white' : 'text-white/60'}`} />
                  <div>
                    <h4 className='font-medium text-lg capitalize'>{data.name}</h4>
                  </div>
                </Link>)
            })
          }
        </div>
      </div>
    </div>
  )
}
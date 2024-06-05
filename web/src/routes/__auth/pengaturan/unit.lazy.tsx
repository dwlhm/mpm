import { useQuery } from 'react-query'
import { useAuth } from '../../../auth'
import { Api } from '../../../api/internal'
import { Link, Outlet, createLazyFileRoute, useParams } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import Loadings from '../../../components/Loadings'
import Errors from '../../../components/Errors'
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline'
import { Unit, getUnit } from '../../../api/unit'

export const Route = createLazyFileRoute('/__auth/pengaturan/unit')({
  component: PengaturanUnit
})

function PengaturanUnit() {
    
  const auth = useAuth()
  const { unitId } = useParams<any>({ strict: false })
  const { isLoading, isError, error, isSuccess, data } = useQuery<Api<Unit[]>, AxiosError>({
    queryKey: ['unit', auth.token],
    queryFn: getUnit,
    retry: 2
  })
  const unit_id = data?.results.find(item => item.id == unitId )
    if (isLoading) <Loadings />

    if (isError) <Errors process='mendapatkan data list unit' message={error} />
    
    if (isSuccess) return(
        <div>
        <header>
            <h2 className='py-1 flex gap-1 items-center'>
            <Link to='/pengaturan/unit' className='text-2xl'>Unit</Link> { 
            unit_id 
                && <><ChevronRightIcon className='w-6 h-6 inline' /> <span className='text-blue-900 font-medium'><Link
                to='/pengaturan/unit/$unitId'
                params={{ unitId }}>{unit_id.name}</Link></span></>
            }
            </h2>
            <Link 
            to='/pengaturan/unit/baru'
            className="bg-blue-900 py-2 px-4 mb-2 mt-3 text-white rounded inline-block transition hover:bg-blue-900/90">Tambah Unit</Link> 
        </header>
        <main className='mt-5'>
            { !unitId && <ListUnit data={data} unit_id='' /> }
            <Outlet />
        </main>
        </div>
    )
}

function ListUnit(props: { data: Api<Unit[]>, unit_id: string }) {

    const unitId = props.unit_id

    return(
      <div className={`flex grow w-full ${unitId && 'bg-gray-200'}`}>
        <div className={`w-full py-2 overflow-auto`}>
          <div className={`grid grid-cols-5 gap-4`}>
            {props.data.results.map((data, index) => {
                return (
                  <Link 
                    key={index}
                    to={`/pengaturan/unit/${data.id}`}
                    params={{ unitId }}
                    className={`pengaturan transition py-2 px-4 flex items-center gap-3 ${!unitId ? 'text-white bg-blue-900 border border-2 border-blue-900 hover:border-slate-800 rounded' : 'text-gray-100 hover:bg-gray-800/50 hover:rounded'}`}>
                    <HomeIcon className={`w-6 h-6 ${!unitId ? 'text-white' : 'text-white/60'}`} />
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
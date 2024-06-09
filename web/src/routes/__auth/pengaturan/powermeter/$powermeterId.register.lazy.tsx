import Errors from '../../../../components/Errors'
import { Register, RegisterItem, getRegisterByPowermeter } from '../../../../api/register'
import { useAuth } from '../../../../auth'
import Loadings from '../../../../components/Loadings'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { useQuery, useQueryClient } from 'react-query'
import { AxiosError } from 'axios'
import { Api } from '../../../../api/internal'
import { Powermeter, getPowermeter } from '../../../../api/powermeter'

export const Route = createLazyFileRoute('/__auth/pengaturan/powermeter/$powermeterId/register')({
  component: PowermeterRegister
})

function PowermeterRegister() {

  const auth = useAuth()
  const { powermeterId } = Route.useParams()
  const { data } = useQuery<Api<Register>, AxiosError>({
    queryFn: getRegisterByPowermeter,
    queryKey: ['powermeter.register', auth.token, powermeterId]
  })
  const { data: pmRepo } = useQuery<Api<Powermeter[]>, AxiosError>({
    queryFn: getPowermeter,
    queryKey: [ 'powermeter', auth.token],
    retry: 2
  })
  const pmData = pmRepo?.results.find(item => item.id == powermeterId)

  return(
    <div className='fixed inset-0 flex justify-center items-center z-20'>
      <div 
        className='bg-white rounded shadow-md w-full h-full p-3'>
        <header className='flex justify-between items-center my-2'>
          <h3 className='text-lg font-medium'>Data Register</h3>
          <Link 
          to='/pengaturan/powermeter/$powermeterId'
          params={{ powermeterId }}>
            <div className='bg-red-900 p-1 rounded w-full transition border border-2 border-red-900 transition hover:border-red-600'>
              <XMarkIcon className="block h-6 w-6 text-white" />
            </div>
          </Link>
        </header>
        
        <div className='my-3'>
          <div>
            <p><span className='text-sm text-black/50 italic block'>Seri Powermeter</span>{pmData?.seri}</p>
            <p><span className='text-sm text-black/50 italic block'>Brand Powermeter</span>{pmData?.brand}</p>
            <Link 
              className='bg-blue-900 py-2 px-3 my-5 rounded text-white transition hover:bg-blue-900/80 inline-block'
              to='/pengaturan/powermeter/$powermeterId/register/baru'
              params={{ powermeterId }}>Tambah Register</Link>
          </div>
          <div className='register-table font-medium'>
            <p>Alamat (Desimal)</p>
            <p>Pengkali</p>
            <p>Besaran</p>
            <p>Nama</p>
            <p>Param</p>
          </div>
          <Outlet />
          {
            (JSON.parse(String(data?.results.register)) as RegisterItem[]).map((v: RegisterItem) => (
              <div className='register-table'>
                <p>{String(v[0])}</p>
                <p>{String(v[1])}</p>
                <p>{v[2]}</p>
                <p>{v[3]}</p>
                <p>{v[4]}</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
import { useAuth } from '../../../../auth'
import { Api } from '../../../../api/internal'
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { getPowermeter, Powermeter } from '../../../../api/powermeter'

export const Route = createLazyFileRoute('/__auth/pengaturan/powermeter/$powermeterId')({
  component: PowermeterDetail
})

function PowermeterDetail() {

  const auth = useAuth()
  const { powermeterId } = Route.useParams()
  const { data } = useQuery<Api<Powermeter[]>, AxiosError>({
    queryKey: ['powermeter', auth.token],
    queryFn: getPowermeter,
    retry: 2
  })
  const powermter_data = data?.results.find(item => item.id == powermeterId)
  return(
    <div>
      <p>Seri Powermeter:</p>
      <p className='my-2 text-3xl'>{powermter_data?.seri}</p>
      <p>Brand Powermeter:</p>
      <p className='my-2 text-3xl'>{powermter_data?.brand}</p>
      <Outlet />
      <div className='mt-8 gap-4 flex'>
        <Link
          to='/pengaturan/powermeter/$powermeterId/edit'
          params={{ powermeterId }}
          className='inline-block py-2 px-4 rounded border-2 border-gray-900 text-gray-900 text-sm transition hover:border-blue-500'>
          Edit Powermeter
        </Link>
        <Link
          to='/pengaturan/powermeter/$powermeterId/hapus'
          params={{ powermeterId }}
          className='inline-block py-2 px-4 rounded border-2 border-red-900 bg-red-900 text-white text-sm transition hover:border-blue-500'>
          Hapus Powermeter
        </Link>
      </div>
    </div>
  )
}
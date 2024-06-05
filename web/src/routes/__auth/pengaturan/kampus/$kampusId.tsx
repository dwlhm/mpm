import { useAuth } from '../../../../auth'
import { Api } from '../../../../api/internal'
import { getKampus, Kampus } from '../../../../api/kampus'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'

export const Route = createFileRoute('/__auth/pengaturan/kampus/$kampusId')({
  component: KampusDetail
})

function KampusDetail() {

  const auth = useAuth()
  const { kampusId } = Route.useParams()
  const { data } = useQuery<Api<Kampus[]>, AxiosError>({
    queryKey: ['kampus', auth.token],
    queryFn: getKampus,
    retry: 2
  })
  const kampus = data?.results.find(item => item.id == kampusId)
  return(
    <div>
      <p>Nama:</p>
      <p className='my-2 text-3xl'>{kampus?.name}</p>
      <Outlet />
      <div className='mt-8 gap-4 flex'>
        <Link
          to="/pengaturan/kampus/$kampusId/edit"
          params={{ kampusId }}
          className='inline-block py-2 px-4 rounded border-2 border-gray-900 text-gray-900 text-sm transition hover:border-blue-500'>
          Edit Kampus
        </Link>
        <Link
          to="/pengaturan/kampus/$kampusId/hapus"
          params={{ kampusId }}
          className='inline-block py-2 px-4 rounded border-2 border-red-900 bg-red-900 text-white text-sm transition hover:border-blue-500'>
          Hapus Kampus
        </Link>
      </div>
    </div>
  )
}
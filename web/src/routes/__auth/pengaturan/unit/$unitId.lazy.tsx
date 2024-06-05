import { useAuth } from '../../../../auth'
import { Api } from '../../../../api/internal'
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { getUnit, Unit } from '../../../../api/unit'

export const Route = createLazyFileRoute('/__auth/pengaturan/unit/$unitId')({
  component: UnitDetail
})

function UnitDetail() {

  const auth = useAuth()
  const { unitId } = Route.useParams()
  const { data } = useQuery<Api<Unit[]>, AxiosError>({
    queryKey: ['unit', auth.token],
    queryFn: getUnit,
    retry: 2
  })
  const unit = data?.results.find(item => item.id == unitId)
  return(
    <div>
      <p>Nama:</p>
      <p className='my-2 text-3xl'>{unit?.name}</p>
      <Outlet />
      <div className='mt-8 gap-4 flex'>
        <Link
          to='/pengaturan/unit/$unitId/edit'
          params={{ unitId }}
          className='inline-block py-2 px-4 rounded border-2 border-gray-900 text-gray-900 text-sm transition hover:border-blue-500'>
          Edit Unit
        </Link>
        <Link
          to='/pengaturan/unit/$unitId/hapus'
          params={{ unitId }}
          className='inline-block py-2 px-4 rounded border-2 border-red-900 bg-red-900 text-white text-sm transition hover:border-blue-500'>
          Hapus Unit
        </Link>
      </div>
    </div>
  )
}
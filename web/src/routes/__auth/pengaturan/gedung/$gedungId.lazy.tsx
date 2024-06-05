import { useAuth } from '../../../../auth'
import { Api } from '../../../../api/internal'
import { createLazyFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useQuery } from 'react-query'
import { AxiosError } from 'axios'
import { Gedung, getGedung } from '../../../../api/gedung'

export const Route = createLazyFileRoute('/__auth/pengaturan/gedung/$gedungId')({
  component: GedungDetail
})

function GedungDetail() {

  const auth = useAuth()
  const { gedungId } = Route.useParams()
  const { data } = useQuery<Api<Gedung[]>, AxiosError>({
    queryKey: ['gedung', auth.token],
    queryFn: getGedung,
    retry: 2
  })
  const gedung = data?.results.find(item => item.id == gedungId)
  return(
    <div>
      <p>Nama Gedung:</p>
      <p className='my-2 text-3xl'>{gedung?.name}</p>
      <p>Unit:</p>
      <p className='my-2 text-3xl'>{gedung?.unit.name}</p>
      <Outlet />
      <div className='mt-8 gap-4 flex'>
        <Link
          to='/pengaturan/gedung/$gedungId/edit'
          params={{ gedungId }}
          className='inline-block py-2 px-4 rounded border-2 border-gray-900 text-gray-900 text-sm transition hover:border-blue-500'>
          Edit Gedung
        </Link>
        <Link
          to='/pengaturan/gedung/$gedungId/hapus'
          params={{ gedungId }}
          className='inline-block py-2 px-4 rounded border-2 border-red-900 bg-red-900 text-white text-sm transition hover:border-blue-500'>
          Hapus Gedung
        </Link>
      </div>
    </div>
  )
}
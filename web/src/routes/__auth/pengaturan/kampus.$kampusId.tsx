import { Api } from '@/src/api/internal'
import { Kampus } from '@/src/api/kampus'
import { createFileRoute, Link, Outlet } from '@tanstack/react-router'
import { useQueryClient } from 'react-query'

export const Route = createFileRoute('/__auth/pengaturan/kampus/$kampusId')({
  component: KampusDetail
})

function KampusDetail() {
  const { kampusId } = Route.useParams()
  const queryClient = useQueryClient()
  const kampusRepo = queryClient.getQueriesData(["kampus"])
  const kampusApiData = kampusRepo[0][1] as Api<Kampus[]>
  const kampus = kampusApiData.results.find(item => item.id == kampusId)
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
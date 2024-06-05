import { removeGedung } from '../../../../api/gedung'
import { useAuth } from '../../../../auth'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from 'react-query'

export const Route = createLazyFileRoute('/__auth/pengaturan/gedung/$gedungId/hapus')({
  component: HapusGedung
})

function HapusGedung() {

  const queryClient = useQueryClient()
  const auth = useAuth()
  const { gedungId } = Route.useParams()
  const navigate = Route.useNavigate()
  const mutation = useMutation({
      mutationFn: removeGedung,
      onSettled: () => {
          queryClient.invalidateQueries()
      }
  })
  const onRemove = async () => {
      await mutation.mutate({
          token: auth.token,
          id: gedungId
      }, {
          onSuccess: () => {
              navigate({ to: '/pengaturan/gedung' })
          }
      })
  }

  return(
    <div className='bg-red-300 border border-red-500 p-3 rounded mb-5 flex justify-between items-center transition'>
      <p>Yakin menghapus gedung ini?</p>
      <div>
        <button
          onClick={onRemove} 
          className='py-2 px-5 rounded bg-red-500/50 mx-2 text-sm'>Hapus</button>
        <Link 
          to='/pengaturan/gedung/$gedungId'
          params={{ gedungId }}
          className='py-2 px-5 rounded bg-blue-900 mx-2 text-sm text-white'
          >
          Tidak
        </Link>
      </div>
    </div>
  )
}
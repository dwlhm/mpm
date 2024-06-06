import { removePowermeter } from '../../../../api/powermeter'
import { useAuth } from '../../../../auth'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from 'react-query'

export const Route = createLazyFileRoute('/__auth/pengaturan/powermeter/$powermeterId/hapus')({
  component: HapusPowermeter
})

function HapusPowermeter() {

  const queryClient = useQueryClient()
  const auth = useAuth()
  const { powermeterId } = Route.useParams()
  const navigate = Route.useNavigate()
  const mutation = useMutation({
      mutationFn: removePowermeter,
      onSettled: () => {
          queryClient.invalidateQueries()
      }
  })
  const onRemove = async () => {
      await mutation.mutate({
          token: auth.token,
          id: powermeterId
      }, {
          onSuccess: () => {
              navigate({ to: "/pengaturan/powermeter" })
          }
      })
  }

  return(
    <div className='bg-red-300 border border-red-500 p-3 rounded mb-5 flex justify-between items-center transition'>
      <p>Yakin menghapus powermeter ini?</p>
      <div>
        <button
          onClick={onRemove} 
          className='py-2 px-5 rounded bg-red-500/50 mx-2 text-sm'>Hapus</button>
        <Link 
          to='/pengaturan/powermeter/$powermeterId'
          params={{ powermeterId }}
          className='py-2 px-5 rounded bg-blue-900 mx-2 text-sm text-white'
          >
          Tidak
        </Link>
      </div>
    </div>
  )
}
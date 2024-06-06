import { removeUnit } from '../../../../api/unit'
import { useAuth } from '../../../../auth'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from 'react-query'

export const Route = createLazyFileRoute('/__auth/pengaturan/unit/$unitId/hapus')({
  component: HapusUnit
})

function HapusUnit() {

  const queryClient = useQueryClient()
  const auth = useAuth()
  const { unitId } = Route.useParams()
  const navigate = Route.useNavigate()
  const mutation = useMutation({
      mutationFn: removeUnit,
      onSettled: () => {
          queryClient.invalidateQueries()
      }
  })
  const onRemove = async () => {
      await mutation.mutate({
          token: auth.token,
          id: unitId
      }, {
          onSuccess: () => {
              navigate({ to: "/pengaturan/unit" })
          }
      })
  }

  return(
    <div className='bg-red-300 border border-red-500 p-3 rounded mb-5 flex justify-between items-center transition'>
      <p>Yakin menghapus unit ini?</p>
      <div>
        <button
          onClick={onRemove} 
          className='py-2 px-5 rounded bg-red-500/50 mx-2 text-sm'>Hapus</button>
        <Link 
          to='/pengaturan/unit/$unitId'
          params={{ unitId }}
          className='py-2 px-5 rounded bg-blue-900 mx-2 text-sm text-white'
          >
          Tidak
        </Link>
      </div>
    </div>
  )
}
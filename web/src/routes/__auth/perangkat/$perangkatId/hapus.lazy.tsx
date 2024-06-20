import { removeDevices } from '../../../../api/devices'
import { useAuth } from '../../../../auth'
import { Link, createLazyFileRoute } from '@tanstack/react-router'
import { useMutation, useQueryClient } from 'react-query'

export const Route = createLazyFileRoute('/__auth/perangkat/$perangkatId/hapus')({
  component: HapusPerangkat
})

function HapusPerangkat() {

    const queryClient = useQueryClient()
    const auth = useAuth()
    const { perangkatId } = Route.useParams()
    const navigate = Route.useNavigate()
    const mutation = useMutation({
        mutationFn: removeDevices,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: [ 'devices', auth.token ]})
        }
    })
    const onRemove = async () => {
        await mutation.mutate({
            token: auth.token,
            id: perangkatId
        }, {
            onSuccess: () => {
                navigate({ to: "/perangkat" })
            }
        })
    }
    return(
        <div className='bg-red-300 border border-red-500 p-3 rounded mb-5 flex justify-between items-center transition'>
            <p>Yakin menghapus perangkat ini?</p>
            <div>
                <button
                    onClick={onRemove} 
                    className='py-2 px-5 rounded bg-red-500/50 mx-2 text-sm'>Hapus</button>
                <Link 
                    to='/perangkat/$perangkatId/data'
                    params={{ perangkatId: perangkatId }}
                    className='py-2 px-5 rounded bg-blue-900 mx-2 text-sm text-white'
                >
                    Tidak
                </Link>
            </div>
        </div>
    )
}
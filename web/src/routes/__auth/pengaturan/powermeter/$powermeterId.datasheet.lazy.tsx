import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link, createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/__auth/pengaturan/powermeter/$powermeterId/datasheet')({
  component: PowermeterDatasheet
})

function PowermeterDatasheet() {
  const { powermeterId } = Route.useParams()
  return(
    <div className='fixed inset-0 flex justify-center items-center'>
      <div 
        className='bg-white rounded shadow-md w-full max-w-2xl p-3'>
        <Link 
          to='/pengaturan/powermeter/$powermeterId'
          params={{ powermeterId }}
          className='inline-block float-right'>
            <div className='bg-red-900 p-1 rounded w-full transition border border-2 border-red-900 transition hover:border-red-600'>
              <XMarkIcon className="block h-6 w-6 text-white" />
            </div>
        </Link>
      </div>
    </div>
  )
}
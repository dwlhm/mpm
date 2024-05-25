import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import {
  ChevronDownIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/16/solid'
import { useQuery } from 'react-query'
import { Link, Outlet, createLazyFileRoute } from '@tanstack/react-router'
import { getDeviceDetail } from '../../../api/devices'
import { useAuth } from '../../../auth'

export const Route = createLazyFileRoute('/__auth/perangkat/$perangkatId')({
  component: PreviewPerangkat
})

function PreviewPerangkat() {

  const user = useAuth()
  const { perangkatId } = Route.useParams()

  const { isLoading, isError, isSuccess, data, ...queryInfo } = useQuery({
    queryKey: [`devices.${perangkatId}`, user.token, perangkatId ],
    queryFn: getDeviceDetail
  })

  if (isLoading) return <p>Mendapatkan data perangkat...</p>
  if (isError) return <p className='text-red-800'><span className='font-semibold'>Error: </span>{queryInfo.error as String}</p>
  if (isSuccess) return(
    <div className='grow p-2 sm:p-6 lg:p-8 bg-white rounded shadow'>
      <Outlet />
      <div className='flex justify-between items-center'>
        <div>
          <h2 className='font-semibold text-xl'>{data.results.name}</h2>
          <p className="text-sm">{data.results.ip_addr} - {data.results.seri}</p>  
        </div>
        <div>
          <PerangkatOptions perangkatId={perangkatId} />
        </div>
      </div>
    </div>
  )
}

function PerangkatOptions(props: {perangkatId: string}) {
  return(
    <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Options
          <ChevronDownIcon className="size-4 fill-white/60" />
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="mt-2 w-52 origin-top-right rounded-xl border border-white bg-gray-800 p-1 text-sm/6 text-white [--anchor-gap:var(--spacing-1)] focus:outline-none"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <PencilIcon className="size-4 fill-white/30" />
                Edit
              </button>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              <Link 
                to='/perangkat/$perangkatId/hapus'
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10"
                >
                <TrashIcon className="size-4 fill-white/30" />
                Hapus
              </Link>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
  )
}
import { Menu, MenuButton, Transition, MenuItems, MenuItem } from "@headlessui/react";
import { ChevronDownIcon, TrashIcon, PencilIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";

export default function PerangkatOptions(props: {perangkatId: string}) {
  return(
    <Menu>
        <MenuButton className="inline-flex items-center gap-2 rounded-md bg-gray-800 py-1.5 px-3 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-700 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white">
          Pengaturan
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
              <Link 
                to="/perangkat/$perangkatId/edit"
                params={{ perangkatId: props.perangkatId }}
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10">
                <PencilIcon className="size-4 fill-white/30" />
                Edit
              </Link>
            </MenuItem>
            <div className="my-1 h-px bg-white/5" />
            <MenuItem>
              <Link 
                to='/perangkat/$perangkatId/hapus'
                params={{ perangkatId: props.perangkatId }}
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
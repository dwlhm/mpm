import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Link } from "@tanstack/react-router";

export type CompPerangkatIntervalFilterProps = {
  interval: string;
  perangkatId: string;
  onFilterChanged: (b: boolean) => void;
};

export const CompPerangkatIntervalFilter = (
  props: CompPerangkatIntervalFilterProps,
) => {
  return (
    <Menu>
      <MenuButton className="bg-gray-900 text-gray-200 text-sm py-2 px-5 rounded w-fit flex gap-4 capitalize items-center">
        {props.interval} <ChevronDownIcon className="size-5" />
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
          anchor="bottom start"
          className="bg-gray-900 text-gray-200 text-sm p-2 mt-2 rounded min-w-36 border border-gray-700"
        >
          <MenuItem>
            <Link
              className="block p-2 mb-2 hover:bg-gray-500 rounded"
              to="/perangkat/$perangkatId/data"
              params={{ perangkatId: props.perangkatId }}
              search={{ interval: "hourly" }}
              onClick={() => props.onFilterChanged(true)}
              activeProps={{
                className: "bg-gray-500",
              }}
            >
              Hourly
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="block p-2 mb-2 hover:bg-gray-500 rounded"
              to="/perangkat/$perangkatId/data"
              params={{ perangkatId: props.perangkatId }}
              search={{ interval: "daily" }}
              onClick={() => props.onFilterChanged(true)}
              activeProps={{
                className: "bg-gray-500",
              }}
            >
              Daily
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="block p-2 mb-2 hover:bg-gray-500 rounded"
              to="/perangkat/$perangkatId/data"
              params={{ perangkatId: props.perangkatId }}
              search={{ interval: "weekly" }}
              onClick={() => props.onFilterChanged(true)}
              activeProps={{
                className: "bg-gray-500",
              }}
            >
              Weekly
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="block p-2 mb-2 hover:bg-gray-500 rounded"
              to="/perangkat/$perangkatId/data"
              params={{ perangkatId: props.perangkatId }}
              search={{ interval: "monthly" }}
              onClick={() => props.onFilterChanged(true)}
              activeProps={{
                className: "bg-gray-500",
              }}
            >
              Monthly
            </Link>
          </MenuItem>
          <MenuItem>
            <Link
              className="block p-2 hover:bg-gray-500 rounded"
              to="/perangkat/$perangkatId/data"
              params={{ perangkatId: props.perangkatId }}
              search={{ interval: "realtime" }}
              onClick={() => props.onFilterChanged(true)}
              activeProps={{
                className: "bg-gray-500",
              }}
            >
              Realtime
            </Link>
          </MenuItem>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

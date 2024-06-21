import { CompButton, CompButtonLinkGroup } from "@/common";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import {
  ChartBarIcon,
  ChevronDownIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Link, useNavigate, useSearch } from "@tanstack/react-router";
import { Dayjs } from "dayjs";
import React from "react";

export const PerangkatFilterBar = (props: { perangkatId: string }) => {
  const navigate = useNavigate();
  const [from, setFrom] = React.useState<Dayjs | null>(null);
  const [to, setTo] = React.useState<Dayjs | null>(null);
  const [mode, interval] = useSearch({
    from: "/__auth/perangkat/$perangkatId/data",
    select: (search: { mode: string; interval: string }) => {
      if (!search.mode && search.interval != undefined)
        navigate({
          to: "/perangkat/$perangkatId/data",
          params: { perangkatId: props.perangkatId },
          search: { mode: "grafik" },
        });
      if (search.mode != undefined && !search.interval)
        navigate({
          to: "/perangkat/$perangkatId/data",
          params: { perangkatId: props.perangkatId },
          search: { interval: "realtime" },
        });
      if (!search.mode && !search.interval)
        navigate({
          to: "/perangkat/$perangkatId/data",
          params: { perangkatId: props.perangkatId },
          search: { mode: "grafik", interval: "realtime" },
        });
      return [search.mode, search.interval];
    },
  });
  return (
    <div className="mt-2 my-5 flex justify-between">
      <div className="flex gap-2">
        <Menu>
          <MenuButton className="bg-gray-900 text-gray-200 text-sm py-2 px-5 rounded w-fit flex gap-4 capitalize items-center">
            {interval} <ChevronDownIcon className="size-5" />
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
                  search={{ mode: mode, interval: "hourly" }}
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
                  search={{ mode: mode, interval: "daily" }}
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
                  search={{ mode: mode, interval: "weekly" }}
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
                  search={{ mode: mode, interval: "monthly" }}
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
                  search={{ mode: mode, interval: "realtime" }}
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
        <div className={`date_time flex bg-gray-900 rounded text-gray-200`}>
          <DateTimePicker
            label="Dari"
            value={from}
            onChange={(newValue) => setFrom(newValue)}
          />
          <DateTimePicker
            label="Hingga"
            value={to}
            onChange={(newValue) => setTo(newValue)}
          />
        </div>
      </div>
      <CompButtonLinkGroup>
        <CompButton>
          <Link
            to="/perangkat/$perangkatId/data"
            search={{
              mode: "grafik",
              interval: interval,
            }}
            params={{ perangkatId: props.perangkatId }}
            activeProps={{
              className: "bg-blue-900",
            }}
          >
            <ChartBarIcon className="size-5" />
            Grafik
          </Link>
        </CompButton>
        <CompButton>
          <Link
            to="/perangkat/$perangkatId/data"
            params={{ perangkatId: props.perangkatId }}
            search={{
              mode: "tabel",
              interval: interval,
            }}
            activeProps={{
              className: "bg-blue-900",
            }}
          >
            <ViewColumnsIcon className="size-5" />
            Tabel
          </Link>
        </CompButton>
      </CompButtonLinkGroup>
    </div>
  );
};
